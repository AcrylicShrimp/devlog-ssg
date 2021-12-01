module.exports = {
	template: 'about.svelte',
	permalink: '/about',
	all: async () => {
		return [{ slug: 'about' }];
	},
};
