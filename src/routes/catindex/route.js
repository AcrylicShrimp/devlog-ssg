module.exports = {
	template: 'catindex.svelte',
	permalink: '/categories',
	all: async () => {
		return [{ slug: '/' }];
	},
	data: async () => {
		const posts = (await import('../../../posts/.gen.js')).default;
		const cats = new Map();

		for (const post of posts) {
			if (!post.category) continue;
			let cat = cats.get(post.category);
			if (!cat) cat = [0, 0];
			cat[0] += 1;
			cat[1] = Math.max(cat[1], post['written-at']);
			cats.set(post.category, cat);
		}

		return {
			categories: [...cats.keys()]
				.sort((a, b) => a > b)
				.map((cat) => {
					const category = cats.get(cat);
					return {
						name: cat,
						count: category[0],
						writtenAt: new Date(category[1]),
					};
				}),
		};
	},
};
