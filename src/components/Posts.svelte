<script>
	export let helpers, posts;

	function formatDate(date) {
		return `${String(date.getUTCFullYear()).padStart(4, '0')}/${String(date.getUTCMonth() + 1).padStart(
			2,
			'0',
		)}/${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(
			date.getUTCMinutes(),
		).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`;
	}
</script>

<style lang="postcss">
	.post-item + .post-item {
		@apply mt-2;
	}
</style>

<section class="mt-4 flex flex-col justify-start align-center text-sm sm:text-lg">
	{#each posts as post (post.slug)}
		<article class="post-item">
			<p>
				<span class="text-xs block sm:text-lg sm:inline text-gray">[{formatDate(post.writtenAt)}]</span>
				{#if post.category}
					<a
						href={`${helpers.permalinks.cat({ name: post.category })}index.html`}
						class="text-xs sm:text-lg text-wine hover:underline">[{post.category}]</a>
				{:else}
					<span class="text-xs sm:text-lg text-wine">[{post.category}]</span>
				{/if}
				<a href={`${helpers.permalinks.post({ slug: post.slug })}index.html`} class="text-yellow hover:underline"
					>{post.title}</a>
			</p>
		</article>
	{:else}
		<article>
			<p class="text-gray">No post yet :&#40;</p>
		</article>
	{/each}
</section>
