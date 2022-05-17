module.exports = {
	template: 'cat.svelte',
	permalink: '/categories/:name',
	all: async () => {
		const posts = (await import('../../../posts/.gen.js')).default;
		return [...new Set(posts.map((post) => post.category))]
			.filter((category) => !!category)
			.map((category) => ({ name: category }));
	},
	data: async ({ request }) => {
		const posts = (await import('../../../posts/.gen.js')).default;
		return {
			category: request.name,
			posts: posts
				.filter((post) => post.category === request.name)
				.map((post) => ({
					slug: post.slug,
					title: post.title,
					category: post.category,
					writtenAt: new Date(post['written-at']),
				})),
		};
	},
};
