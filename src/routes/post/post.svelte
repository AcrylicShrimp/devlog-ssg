<script>
	import Post from '../../components/Post.svelte';

	export let data, request, settings;
</script>

<svelte:head>
	<title>ashrimp blog - {data.post.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
	<meta
		name="description"
		content="This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming." />
</svelte:head>

<Post
	title={data.post.title}
	category={data.post.category}
	content={data.post.content}
	writtenAt={data.post.writtenAt} />
