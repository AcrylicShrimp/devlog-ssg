<script>
	import Categories from '../../components/Categories.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>ashrimp blog</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">Categories</h1>
	</header>
	<Categories {helpers} categories={data.categories} />
</article>
