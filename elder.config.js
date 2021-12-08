require('dotenv').config();
const path = require('path');

module.exports = {
	origin: 'https://blog.ashrimp.dev', // TODO: update this. The URL of your site's root, without a trailing slash
	lang: 'ko',
	srcDir: 'src',
	distDir: 'dist',
	rootDir: process.cwd(),
	build: {},
	prefix: '', // If you want your site to be built within a sub folder within your `distDir` you can use this.
	server: {},
	props: {
		hydration: 'hybrid',
		compress: true,
	},
	debug: {
		stacks: false, // output details of the stack consolidation process.
		hooks: false, // outputs the details of each hook as they are run.
		performance: false, // outputs a full performance report of how long it took to run each page.
		build: false, // gives additional details about the build process.
		automagic: false,
	},
	hooks: {},
	plugins: {
		'@elderjs/plugin-browser-reload': {
			port: 8080,
			reload: true,
		},
		'@elderjs/plugin-seo-check': {
			display: ['errors', 'warnings'],
		},
		'@elderjs/plugin-sitemap': {
			origin: 'https://blog.ashrimp.dev',
			exclude: ['fallback'], // an array of permalinks or permalink prefixes. So you can do ['500'] and it will match /500**
			lastUpdate: {
				index: '2021-12-08',
				about: '2021-12-08',
				post: async ({ query, request }) => {
					const post = (await import(path.join(process.cwd(), 'posts', '.gen.js'))).default;
					return new Date(post.find((post) => (post.slug = request.slug))['modified-at']);
				},
			}, // configurable last update for each route type.
		},
	},
	shortcodes: { closePattern: '}}', openPattern: '{{' },
};
