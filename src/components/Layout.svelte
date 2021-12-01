<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="p-6 pt-12 md:max-w-screen-lg md:mx-auto">
	<Header />
	<div class="mt-24 mb-36 max-w-screen-lg">
		<slot />
	</div>
	<Footer />
</div>
