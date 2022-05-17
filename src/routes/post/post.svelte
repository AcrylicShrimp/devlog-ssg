<script>
	import Post from '../../components/Post.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>ashrimp blog - {data.post.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
</svelte:head>

<Post
	{helpers}
	title={data.post.title}
	category={data.post.category}
	content={data.post.content}
	writtenAt={data.post.writtenAt} />
