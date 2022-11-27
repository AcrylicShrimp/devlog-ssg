<script>
	export let request, settings;
</script>

<svelte:head>
	<title>not found - {settings.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
	<meta name="description" content="Please double-check the URL and try again!" />
	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="not found - {settings.title}" />
	<meta property="og:description" content="Please double-check the URL and try again!" />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="not found - {settings.title}" />
	<meta name="twitter:description" content="Please double-check the URL and try again!" />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">Page not found</h1>
	</header>
	<p class="mt-4 text-lg text-gray">Please double-check the URL and try again!</p>
	<img src="/img/404.gif" alt="the A.R.O.N.A trys to hit you" class="block mx-auto my-6 rounded max-w-full" />
</article>
