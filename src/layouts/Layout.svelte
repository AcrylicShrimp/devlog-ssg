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

<div class="p-1 py-4 sm:p-6 sm:pt-12 md:max-w-screen-lg md:mx-auto">
	<Header {helpers} />
	<div class="mt-12 mb-16 sm:mt-24 sm:mb-36 max-w-screen-lg">
		{@html templateHtml}
	</div>
	<Footer />
</div>
