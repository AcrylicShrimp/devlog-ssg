최근 이직하고 나서 새로운 서비스를 개발하게 됐다. 향후 확장성을 위해 `k8s`를 쓰기로 했는데, 이왕이면 CI/CD까지 해보고 싶은 욕심이 났다. push만 하면 알아서 빌드하고 배포까지 해준다니, 듣기만 해도 환상적이다. 하지만 사나흘의 삽질은 환상적이지 못했다. 여기에 내가 어떤 삽질을 통해 구현하게 됬는지 정리해본다.

# Design

내가 원하는 궁극적인 흐름은 아래와 같다.

1. branch에 push한다.
2. [Github Action](https://github.com/features/actions)이 서비스를 빌드한다.
3. Github Action이 빌드된 도커 컨테이너를 [Docker Hub](https://hub.docker.com/)에 push한다.
4. Github Action이 `auto-deployer`에 신호를 보낸다.
5. `auto-deployer`가 `k8s`에 rollout을 trigger한다.

4번에서 Github Action이 아니라 Docker Hub가 신호를 보내도 된다. 다만 구현 편의상 이렇게 했을 뿐이다. Docker Hub가 보낸 신호를 검증하려면 domain이 올바른지 확인하면 된다.

# Build Automation

먼저 Github Action을 구성했다. 리포지토리에 `.github/workflow`라는 디렉터리를 만들고 안에 아무 이름의 `yaml` 파일을 작성하면 된다.

```yml
name: Dockerize

on:
  push:
    branches:
      - master

jobs:
  dockerize:
    runs-on: ubuntu-18.04

    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js v10
        uses: actions/setup-node@v1
        with:
          node-version: 10

      - name: Install npm packages
        run: npm install

      - name: Transpile typescript
        run: npm run build

      - name: Dockerize and push
        uses: docker/build-push-action@v1.0.1
        with:
          repository: ${{ secrets.REPOSITORY }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          tags: latest
          dockerfile: Dockerfile

      - name: Call webhook
        uses: AcrylicShrimp/webhook-action@1.0.4
        env:
          WEBHOOK_URL: https://deploy.example.com/deployment
          data: '{"pw":"my-password"}'
```

이제 push할 때마다 해당 Docker Hub 리포지토리에 서비스가 빌드되서 올라간다. [`AcrylicShrimp/webhook-action`](https://github.com/AcrylicShrimp/webhook-action)은 `cURL`을 실행하는 간단한 액션이다. 누가 만들어 놨는데 맘에 안들어서 포크했다. 아래에서 작성할 `auto-deployer`에 시그널을 보내기 위해 사용한다.

# Deployment Automation

push할 때마다 빌드되는 `docker` 이미지를 `k8s` 클러스터에 재배포해야 한다. 빌드 이벤트를 감지해서 `k8s`가 제공하는 API로 deployment를 만들거나 재시작하는 작은 WAS를 만들면 된다. 워낙 간단한 서버라 `python flask`로 구현하기로 했다. `uwsgi`로 묶어서 `docker` 컨테이너로 만들었다.

```python
import datetime
import json

from flask import Flask, abort, request
from kubernetes import client, config


app = Flask(__name__)

config.load_incluster_config()
apps_v1 = client.AppsV1Api()

DEPLOYMENT_NAME = 'my-deployment-name'

def create_deployment_object():
    container = client.V1Container(
        name=DEPLOYMENT_NAME,
        image='my-deployment-image',
        image_pull_policy='Always',
        ports=[client.V1ContainerPort(container_port=8080)],
        env=[
            client.V1EnvVar(name='ENV_VAR_NAME', value='env-var-value'),
        ]
    )

    template = client.V1PodTemplateSpec(
        metadata=client.V1ObjectMeta(
            annotations={
                'my-autodeployer/restartedAt': datetime.datetime.now()},
            labels={'app': DEPLOYMENT_NAME}
        ),
        spec=client.V1PodSpec(
            containers=[container],
            image_pull_secrets=[client.V1LocalObjectReference(name='regcred')],
            termination_grace_period_seconds=10
        )
    )

    spec = client.V1DeploymentSpec(
        replicas=1,
        template=template,
        selector={'matchLabels': {'app': DEPLOYMENT_NAME}}
    )

    deployment = client.V1Deployment(
        api_version='apps/v1',
        kind='Deployment',
        metadata=client.V1ObjectMeta(
            name=DEPLOYMENT_NAME,
            labels={'app': DEPLOYMENT_NAME}
        ),
        spec=spec
    )

    return deployment

@app.route('/deployment', methods=['POST'])
def deploy():
    received = request.json

    if not received:
        return abort(400, 'bad request')

    try:
        received = json.loads(received.get('data', ''))
    except Exception as e:
        return abort(400, 'bad request')

    # Checks whether given request is valid.
    if received.get('pw', '') != 'my-password':
        return abort(400, 'bad request')

    try:
        result = apps_v1.read_namespaced_deployment(
            name=DEPLOYMENT_NAME, namespace='default')
    except:
        result = None

    deployment = create_deployment_object()

    if result:
        apps_v1.patch_namespaced_deployment(
            name=DEPLOYMENT_NAME, namespace='default', body=deployment)
    else:
        apps_v1.create_namespaced_deployment(
            namespace='default', body=deployment)

    return 'ok'
```

눈여겨볼 점은 아래와 같다.

- `auto-deployer`도 `k8s` 클러스터 내에서 운영할 계획이므로 `config.load_incluster_config`을 호출했다. 이렇게 하지 않으면 클러스터 내부에서 API에 접근하지 못한다.
- `V1PodTemplateSpec`의 `annotation`에 시간을 넣어주고 있다. `k8s`는 patch시 `V1PodTemplateSpec`이 변경되면 rollout을 진행하는데, 시간을 넣어줌으로써 항상 rollout이 trigger된다.
- 이 코드를 조금만 응용하면 `auto-deployer`가 스스로 자가배포하도록 구성할 수 있다.

# Deploy

앞서 만든 `auto-deployer`를 배포해야한다. 첫 배포니 수동으로 진행해야하는데, 몇 가지 주의할 점이 있다.

- `auto-deployer`에 물려줄 service나 ingress가 제대로 구성됐는지 점검한다. 아니라면 외부에서 접근이 되지 않는다.
- `auto-deployer`를 실행하는 serviceaccount가 적절한 권한을 가지는지 점검한다. 아니라면 `k8s`가 API 접근을 거부한다.

`auto-deployer`를 실행하는 serviceaccount는 아래 clusterrole들을 가져야 한다. 두 번째는 private 리포지토리에서 image를 pull해야할 경우에만 필요하다. 당연히 secret 설정이 선행돼야 한다.

- ['`apps`'] apiGroups, ['`deployments`'] resources, ['`get`', '`create`', '`patch`'] verbs
- ['`apps`'] apiGroups, ['`secrets`'] resources, ['`get`'] verbs

정상적으로 배포됐다면 [Insomnia](https://insomnia.rest/)같은 API 테스트 툴로 `auto-deployer`에 POST 요청을 보내보자. `ok` 응답과 함께 정상적으로 deployment가 생성돼야 한다.

# Conclusion

이렇게 자동배포를 구성해보니 엄청 편하고 좋았다. 다만 쓰다 보니 몇가지 개선점이 보이긴 했다. 배포한 이후 일정 시간 모니터링을 해서 배포가 성공적이었는지, 아니라면 어떤 문제가 생겼는지 알려준다던가. 배포한 이후 필요할 때 즉시 이전 버전으로 롤백한다던가. 서비스 개발하면서 지속적으로 개선해봐야지.
