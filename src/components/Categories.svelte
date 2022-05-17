<script>
	export let helpers, categories;

	function formatDate(date) {
		return `${String(date.getFullYear()).padStart(4, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
			date.getDate(),
		).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
	}
</script>

<style lang="postcss">
	.category-item + .category-item {
		@apply mt-2;
	}
</style>

<section class="mt-4 flex flex-col justify-start align-center text-sm sm:text-lg">
	{#each categories as category (category.name)}
		<article class="category-item">
			<p>
				<span class="text-xs inline sm:text-lg text-gray">[{formatDate(category.writtenAt)}]</span>
				<a href={`${helpers.permalinks.cat({ name: category.name })}index.html`} class="text-wine hover:underline"
					>{category.name}</a>
				<span class="text-xs sm:text-lg text-yellow">[{category.count}]</span>
			</p>
		</article>
	{:else}
		<article>
			<p class="text-gray">No category yet :&#40;</p>
		</article>
	{/each}
</section>
