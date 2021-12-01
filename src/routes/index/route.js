module.exports = {
	template: 'index.svelte',
	permalink: '/',
	all: async () => {
		return [{ slug: '/' }];
	},
	data: async () => {
		const posts = (await import('../../../posts/.gen.js')).default;
		return {
			posts: posts.map((post) => ({
				slug: post.slug,
				title: post.title,
				category: post.category,
				writtenAt: new Date(post['written-at']),
			})),
		};
	},
};
