<script>
	import Posts from '../../components/Posts.svelte';

	export let helpers, data, request, settings;
</script>

<svelte:head>
	<title>{settings.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
	<meta name="description" content={settings.description} />
	<!-- Facebook Meta Tags -->
	<meta property="og:title" content={settings.title} />
	<meta property="og:description" content={settings.description} />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content={settings.title} />
	<meta name="twitter:description" content={settings.description} />
	<!-- Naver Site Verification -->
	<meta name="naver-site-verification" content="aa8852b30cd0b637726970957b8da1f858901c9f" />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">Posts</h1>
	</header>
	<Posts {helpers} posts={data.posts} />
</article>
