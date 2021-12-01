module.exports = {
	template: 'post.svelte',
	permalink: '/posts/:slug',
	all: async () => {
		const posts = (await import('../../../posts/.gen.js')).default;
		return posts.map((post) => ({ slug: post.slug }));
	},
	data: async ({ request }) => {
		const posts = (await import('../../../posts/.gen.js')).default;
		const post = posts.find((post) => post.slug === request.slug);
		return {
			post: {
				slug: post.slug,
				title: post.title,
				category: post.category,
				content: post.content,
				writtenAt: new Date(post['written-at']),
			},
		};
	},
};
