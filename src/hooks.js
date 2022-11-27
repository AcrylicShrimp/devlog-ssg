const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const hooks = [
	{
		hook: 'bootstrap',
		name: 'copyAssetsToPublic',
		description:
			'Copies ./assets/ to the "distDir" defined in the elder.config.js. This function helps support the live reload process.',
		run: ({ settings }) => {
			glob.sync(path.resolve(settings.rootDir, './statics/**/*')).forEach((file) => {
				console.log('copying assets...');

				const parsed = path.parse(file);

				if (parsed.ext && parsed.ext.length > 0) {
					const relativeToAssetsFolder = path.relative(path.join(settings.rootDir, './statics'), file);
					const outputPath = path.resolve(settings.distDir, relativeToAssetsFolder);
					fs.ensureDirSync(path.parse(outputPath).dir);
					fs.outputFileSync(outputPath, fs.readFileSync(file));
				}
			});
		},
	},
	{
		hook: 'bootstrap',
		name: 'copyImagesAndVideosToPublic',
		description:
			'Copies ./img/ and ./vid/ for each post to the "distDir" defined in the elder.config.js. This function helps support the live reload process.',
		run: ({ settings }) => {
			fs.readdirSync(path.resolve(settings.rootDir, 'posts'), { withFileTypes: true })
				.filter((dir) => dir.isDirectory())
				.filter((dir) => !dir.name.startsWith('.'))
				.filter((dir) => dir.name !== 'node_modules')
				.map((dir) => path.resolve(settings.rootDir, 'posts', dir.name))
				.forEach((dir) => {
					const meta = JSON.parse(fs.readFileSync(path.resolve(dir, 'metadata.json'), 'utf-8'));
					console.log(`copying embeds for ${meta.slug}...`);

					const imgPath = path.resolve(dir, 'img');
					const vidPath = path.resolve(dir, 'vid');
					const outPath = path.resolve(settings.distDir, 'posts', meta.slug);

					if (fs.existsSync(imgPath)) fs.copySync(imgPath, path.resolve(outPath, 'img'));
					if (fs.existsSync(vidPath)) fs.copySync(vidPath, path.resolve(outPath, 'vid'));
				});
		},
	},
	{
		hook: 'buildComplete',
		name: 'generateRSSForAllPosts',
		description: 'Generates RSS for all available post routes.',
		run: async ({ errors, allRequests, settings }) => {
			if (errors && errors.length) return; // In case of build failure

			if (!String.prototype.encodeXML) {
				String.prototype.encodeXML = function () {
					return this.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/"/g, '&quot;')
						.replace(/'/g, '&apos;');
				};
			}

			const posts = (await import('../posts/.gen.js')).default;
			const postMap = new Map(posts.map((post) => [post.slug, post]));
			const requests = allRequests.filter(({ permalink }) => permalink.startsWith('/posts/'));
			const rss = [
				'<?xml version="1.0" encoding="UTF-8" ?>',
				'<rss version="2.0">',
				'<channel>',
				`<title>${settings.title.encodeXML()}</title>`,
				`<link>${settings.origin.encodeXML()}</link>`,
				`<description>${settings.description.encodeXML()}</description>`,
			];

			for (const request of requests) {
				const post = postMap.get(request.slug);
				rss.push(
					'<item>',
					`<title>${post.title.encodeXML()}</title>`,
					`<link>${settings.origin}${request.permalink}index.html</link>`,
					`<description>${post.preview.encodeXML()}</description>`,
					'</item>',
				);
			}

			rss.push('</channel>', '</rss>');
			fs.writeFileSync(path.resolve(settings.rootDir, settings.distDir, 'rss.xml'), rss.join(''));
		},
	},
];
module.exports = hooks;
