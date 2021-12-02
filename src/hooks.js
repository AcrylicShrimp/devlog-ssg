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
				.filter((dir) => dir.name !== '.git')
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
];
module.exports = hooks;
