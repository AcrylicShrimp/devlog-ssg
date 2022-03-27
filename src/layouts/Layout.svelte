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

<div class="p-6 pt-12 md:max-w-screen-lg md:mx-auto">
	<Header {helpers} />
	<main class="mt-24 mb-36 max-w-screen-lg">
		{@html templateHtml}
	</main>
	<Footer />
</div>
