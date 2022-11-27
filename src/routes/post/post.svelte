<script>
	import Post from '../../components/Post.svelte';

	export let helpers, data, request, settings;

	function formatDate(date) {
		return `${String(date.getUTCFullYear()).padStart(4, '0')}/${String(date.getUTCMonth() + 1).padStart(
			2,
			'0',
		)}/${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(
			date.getUTCMinutes(),
		).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>{data.post.title} - {settings.title}</title>
	<link href={`${settings.origin}${request.permalink}index.html`} rel="canonical" />
	<meta name="description" content={data.post.preview} />
	<!-- Facebook Meta Tags -->
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.preview} />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.preview} />
</svelte:head>

<article>
	<header>
		<h1 class="font-bold text-xl sm:text-3xl text-lightblue">{data.post.title}</h1>
		{#if data.post.category}
			<p class="mt-1 text-sm text-gray">
				Written in {formatDate(data.post.writtenAt)} UTC, categoried as
				<a href={`${helpers.permalinks.cat({ name: data.post.category })}index.html`} class="text-wine hover:underline"
					>{data.post.category}</a>
			</p>
		{:else}
			<p class="mt-1 text-sm text-gray">Written in {formatDate(data.post.writtenAt)}</p>
		{/if}
	</header>
	<Post content={data.post.content} />
</article>
