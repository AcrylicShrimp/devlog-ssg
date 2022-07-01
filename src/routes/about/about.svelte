<script>
	export let request, settings;
</script>

<svelte:head>
	<title>ashrimp blog - about</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">About</h1>
	</header>
	<div class="mt-4 text-sm sm:text-lg text-gray">
		<p>This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming.</p>
		<p>I'm a developer who interested in graphics and compilers. And I also love games too!</p>
	</div>
	<img src="/img/profile.png" alt="acrylicshrimp profile" class="block mx-auto my-6 rounded max-w-full" />
</article>
