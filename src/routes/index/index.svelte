<script>
	import Posts from '../../components/Posts.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>ashrimp blog</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">Posts</h1>
	</header>
	<Posts {helpers} posts={data.posts} />
</article>
