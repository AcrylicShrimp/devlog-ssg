최근에 Vue.js도 싫고 React도 싫고 해서 찾아보다가 Svelte를 알게 되었다. Svelte는 작성한 컴포넌트를 컴파일러가 Javascript로 트랜스파일하는 방식으로 동작한다. 이 때문에 VDOM을 사용하는 타 라이브러리와는 다르게 순수 DOM을 사용한다. 그러면서도 reactivity와 custom event 등등 필요한 많은 기능을 제공한다. 이러한 장점들이(특히 컴파일 방식으로 동작하는 부분) 크게 다가와서 이 블로그를 개발하는데 사용해 보았다. 하지만 장점만 있지는 않았다. 아래에 내가 실제로 사용해보며 느낀 개인적인 장단점을 정리해 본다.

# 장점

## 런타임 라이브러리가 필요 없음

Svelte 컴파일러가 컴포넌트를 컴파일해 순수 Javascript로 변환하기 때문에 런타임에 성능 저하 없이 동작한다. 이 덕분에 기존 번들러와 같이 사용하기 적절하다.

## 커스텀 이벤트 지원

React와 다르게 커스텀 이벤트를 지원한다. 커스텀 이벤트를 발행하면 해당 컴포넌트를 사용하는 부모 컴포넌트에서 수신할 수 있다. Javascript 객체도 자유롭게 전달할 수 있다.

```html
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	dispatch('myevent', -1);
	dispatch('myevent', 'value');
	dispatch('myevent', { data: 'value' });
</script>
```

부모에서는 아래처럼 수신할 수 있다.

```html
<MyComponent on:myevent="{(event) => console.log(event.detail)}" />
```

## 코드가 매우 간결함

코드가 진짜 엄청나게 짧다. 한 예로 multi-root element를 지원해서 React에서 자주 쓰던 빈 태그로 감싸는 패턴도 필요 없다.

```html
<>
	<MyTag />
	<MyTag />
</>
```

위처럼 하지 않고 아래와 같이 바로 쓸 수 있다.

```html
<MyTag /> <MyTag />
```

그리고 Vue와 비슷하게 컴포넌트를 정의하는데 큰 노력이 필요하지 않다. `.svelte` 파일을 만들고 아래와 같이 작성하면 바로 컴포넌트 완성이다.

```html
<!-- example.svelte -->

<style>
	/* Place component-scoped CSS here. */
</style>

<script>
	// Place javascript code here.
</script>

<!-- Place HTML code here. -->
```

또한 property를 정의하거나 외부 컴포넌트를 불러오기도 쉽다.

```html
<script>
	import { OtherComponent } from './OtherComponent';

	export let property;
</script>

<OtherComponent prop="{property}" />
```

별 것 아닌 것 같지만 간결한 코드는 프로젝트에 매우 큰 이점으로 작용한다.

# 단점

## 공식 문서가 보기 불편함

생각보다 API 문서 보기가 불편하다. Index가 있긴 한데 그냥 내용의 나열일 뿐이라 원하는 내용을 빠르게 찾기가 쉽지 않다.

## Typescript 미지원

Typescript를 지원하지 않는다! 그래서 Typescript를 쓰려면 script 블럭을 트랜스파일해주는 서드파티 라이브러리를 사용해야하는데, 이마저도 완전하지 않아서 import할 때 마다 트랜스파일러가 오류를 뿜는다. 모든 import에 `@ts-ignore`를 먹일 생각이 아니라면 사실상 적용이 어렵다. 게다가 Svelte 구조상 Typescript 지원이 쉽지 않아서 애를 먹고 있는 듯.

## 자료가 많지 않음

타 프론트엔드 프레임워크에 비해 아직 사용하는 사람이 적어서 자료가 풍부한 편이라고 보기 어렵다. Discord에 커뮤니티가 있긴 한데 이것도 엄청 활발하지는 않아서 많은 경우 발생한 문제를 스스로 해결해야한다.

# 결론

Svelte는 아직 오랜 기간 개발된 프레임워크는 아니지만, 특유의 지향점과 사용성에서 큰 이점이 있다. 특히 컴파일러라는 점은 다른 프레임워크 대비 차별점이라고 생각한다. 최근에 개발을 시작했거나 앞으로 시작할 프로젝트라면 Svelte를 적극적으로 도입해도 괜찮을 것 같다. 미숙한 부분도 많이 보이지만 시간이 해결해 주지 않을까? 그래도 Typescript는 하루빨리 지원해줬으면 좋겠다.
