<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let helpers, templateHtml;
</script>

<style global lang="postcss">
	@import '../styles/tailwind.css';
	@import '../styles/index.css';
	@import '../styles/noto-sans-mono-cjk.css';
</style>

<svelte:head>
	<meta
		name="description"
		content="This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming." />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://blog.ashrimp.dev/index.html" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="ashrimp blog" />
	<meta
		property="og:description"
		content="This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming." />
	<meta property="og:image" content="https://blog.ashrimp.dev/img/profile.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="blog.ashrimp.dev" />
	<meta property="twitter:url" content="https://blog.ashrimp.dev/" />
	<meta name="twitter:title" content="ashrimp blog" />
	<meta
		name="twitter:description"
		content="This website is a personal blog of AcrylicShrimp. Most of posts are thinkings and works about programming." />
	<meta name="twitter:image" content="https://blog.ashrimp.dev/img/profile.png" />
</svelte:head>

<div class="p-1 py-4 sm:p-6 sm:pt-12 md:max-w-screen-lg md:mx-auto">
	<Header {helpers} />
	<div class="mt-12 mb-16 sm:mt-24 sm:mb-36 max-w-screen-lg">
		{@html templateHtml}
	</div>
	<Footer />
</div>
