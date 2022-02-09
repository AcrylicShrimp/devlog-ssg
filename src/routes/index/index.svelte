<script>
	import Posts from '../../components/Posts.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>ashrimp blog</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
</svelte:head>

<h1 class="font-bold text-xl text-lightblue">Posts</h1>
<Posts {helpers} posts={data.posts} />
