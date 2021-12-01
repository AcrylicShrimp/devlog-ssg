import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import { selectAll } from 'hast-util-select';
import { toHtml } from 'hast-util-to-html';
import { toText } from 'hast-util-to-text';
import { join } from 'path';
import remarkGFM from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { unified } from 'unified';
import rehypeShiftHeading from 'rehype-shift-heading';

(async () => {
	const dirs = (await fs.readdir(join(process.cwd(), 'posts'), { withFileTypes: true }))
		.filter((dir) => dir.isDirectory())
		.map((dir) => join(process.cwd(), 'posts', dir.name));

	dirs.sort((lhs, rhs) => {
		if (rhs < lhs) return -1;
		if (lhs < rhs) return 1;
		return 0;
	});

	const generated = await Promise.all(
		dirs.map(async (dir) => {
			const meta = JSON.parse(await fs.readFile(join(dir, 'metadata.json'), 'utf-8'));
			const content = await fs.readFile(join(dir, 'content.md'), 'utf-8');

			const hash = createHash('md5').update(content).digest('hex');

			if (meta.hash !== hash) {
				meta.hash = hash;
				meta['modified-at'] = Date.now();
				await fs.writeFile(join(dir, 'metadata.json'), JSON.stringify(meta), 'utf-8');
			}

			const mdast = unified().use(remarkParse).parse(content);
			const hast = await unified()
				.use(remarkGFM)
				.use(remarkRehype)
				.use(rehypeRaw)
				.use(rehypeShiftHeading, { shift: 1 })
				.use(rehypeHighlight)
				.run(mdast);

			for (const img of selectAll('img[src^="./img/"]', hast))
				img.properties.src = `/posts/${meta.slug}/img/${String(img.properties.src).substr(6)}`;

			for (const vid of selectAll('img[src^="./vid/"]', hast)) {
				vid.tagName = 'video';
				vid.properties.src = `/posts/${meta.slug}/vid/${String(vid.properties.src).substr(6)}`;
				vid.properties.controls = true;
				vid.properties.preload = 'metadata';
				vid.children = {
					type: 'text',
					value: vid.properties.alt,
				};
				delete vid.properties.alt;
			}

			const html = toHtml(hast);
			const text = toText(hast);

			return {
				slug: meta.slug,
				title: meta.title,
				category: meta.category,
				preview: text.substr(0, 255).trim(),
				content: html,
				'written-at': meta['written-at'],
				'modified-at': meta['modified-at'],
			};
		}),
	);

	await fs.writeFile(join(process.cwd(), 'posts', '.gen.js'), `module.exports=${JSON.stringify(generated)};`, {
		encoding: 'utf-8',
	});
})();
