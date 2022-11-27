<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let helpers, templateHtml, request, settings;
</script>

<style global lang="postcss">
	@import '../styles/tailwind.css';
	@import '../styles/index.css';
	@import '../styles/noto-sans-mono-cjk.css';
</style>

<svelte:head>
	<!-- Facebook Meta Tags -->
	<meta property="og:site_name" content={settings.title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://blog.ashrimp.dev/img/profile.png" />
	<meta property="og:url" content={`${settings.origin}${request.permalink}index.html`} />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:domain" content="blog.ashrimp.dev" />
	<meta name="twitter:image" content="https://blog.ashrimp.dev/img/profile.png" />
	<meta name="twitter:url" content={`${settings.origin}${request.permalink}index.html`} />
</svelte:head>

<div class="p-1 py-4 sm:p-6 sm:pt-12 md:max-w-screen-lg md:mx-auto">
	<Header {helpers} />
	<main class="mt-12 mb-20 sm:mt-24 sm:mb-40 max-w-screen-lg">
		{@html templateHtml}
	</main>
	<Footer />
</div>
