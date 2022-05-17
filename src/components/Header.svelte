<script>
	export let helpers;
</script>

<style lang="postcss">
	.nav-item + .nav-item {
		@apply ml-4;
	}
</style>

<header class="px-2 sm:px-8 flex flex-row items-end justify-start">
	<p class="font-bold text-2xl sm:text-5xl text-lightblue">
		<a href={helpers.permalinks.index()}>ashrimp blog</a>
	</p>
	<nav class="ml-auto flex flex-row justify-start items-center text-wine">
		<p class="nav-item hover:underline"><a href={`${helpers.permalinks.about()}index.html`}>/about</a></p>
		<p class="nav-item hover:underline"><a href={`${helpers.permalinks.catindex()}index.html`}>/cats</a></p>
	</nav>
</header>
