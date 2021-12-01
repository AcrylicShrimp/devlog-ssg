<script>
	export let request, settings;
</script>

<svelte:head>
	<title>ashrimp blog - about</title>
	<link href={`${settings.origin}${request.permalink}`} rel="canonical" />
	<meta
		name="description"
		content="This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming." />
</svelte:head>

<h1 class="font-bold text-xl text-lightblue">About</h1>
<div class="mt-4 text-lg text-gray">
	<p>This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming.</p>
	<p>I'm a developer who interested in graphics and compilers. And I also love games too!</p>
</div>
