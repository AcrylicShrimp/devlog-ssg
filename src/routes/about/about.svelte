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
		<p>Hello! My name is AcrylicShrimp. I'm a software engineer who interested in graphics and compilers.</p>
		<p>This website is my personal blog. Most of posts are thinkings and works about my fields.</p>
	</div>
	<img src="/img/profile.png" alt="acrylicshrimp profile" class="block mx-auto my-6 rounded max-w-full" />
</article>
