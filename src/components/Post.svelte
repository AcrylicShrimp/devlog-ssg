<script>
	export let title;
	export let category;
	export let content;
	export let writtenAt;

	function formatDate(date) {
		return `${String(date.getFullYear()).padStart(4, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
			date.getDate(),
		).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
			2,
			'0',
		)}:${String(date.getSeconds()).padStart(2, '0')}`;
	}
</script>

<style global lang="postcss">
	@import '../styles/post.css';
	@import '../styles/post-highlight-halflife.css';
</style>

<article>
	<header>
		<h1 class="font-bold text-xl text-lightblue">Posts/{title}</h1>
		{#if category}
			<p class="mt-1 text-sm text-gray">
				Written in {formatDate(writtenAt)}, categoried as
				<span class="text-wine">{category}</span>
			</p>
		{:else}
			<p class="mt-1 text-sm text-gray">Written in {formatDate(writtenAt)}</p>
		{/if}
	</header>
	<div class="mt-16 article">
		{@html content}
	</div>
</article>
