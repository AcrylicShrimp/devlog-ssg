<script>
	import Post from '../../components/Post.svelte';

	export let helpers, data, request, settings;

	function formatDate(date) {
		return `${String(date.getFullYear()).padStart(4, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
			date.getDate(),
		).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
			2,
			'0',
		)}:${String(date.getSeconds()).padStart(2, '0')}`;
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
				Written in {formatDate(data.post.writtenAt)}, categoried as
				<a href={`${helpers.permalinks.cat({ name: data.post.category })}index.html`} class="text-wine hover:underline"
					>{data.post.category}</a>
			</p>
		{:else}
			<p class="mt-1 text-sm text-gray">Written in {formatDate(data.post.writtenAt)}</p>
		{/if}
	</header>
	<Post content={data.post.content} />
</article>
