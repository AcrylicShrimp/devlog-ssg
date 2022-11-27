<script>
	import Posts from '../../components/Posts.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>category {data.category} - {settings.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
	<meta name="description" content={settings.description} />
	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="category {data.category} - {settings.title}" />
	<meta property="og:description" content={settings.description} />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="category {data.category} - {settings.title}" />
	<meta name="twitter:description" content={settings.description} />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">
			Category <span class="text-wine">{data.category}</span>
		</h1>
	</header>
	<Posts {helpers} posts={data.posts} />
</article>
