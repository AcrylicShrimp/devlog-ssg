<script>
	import Categories from '../../components/Categories.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>categories - {settings.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
	<meta name="description" content={settings.description} />
	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="categories - {settings.title}" />
	<meta property="og:description" content={settings.description} />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="categories - {settings.title}" />
	<meta name="twitter:description" content={settings.description} />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">Categories</h1>
	</header>
	<Categories {helpers} categories={data.categories} />
</article>
