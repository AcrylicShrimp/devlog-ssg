<script>
	export let content;
</script>

<style global lang="postcss">
	@import '../styles/katex.min.css';
	@import '../styles/post.css';
	@import '../styles/post-highlight-halflife.css';
</style>

<div class="mt-12 sm:mt-16 article">
	{@html content}
</div>
