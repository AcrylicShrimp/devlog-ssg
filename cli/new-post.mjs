import { promises as fs } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

const readline = createInterface({
	terminal: true,
	input: process.stdin,
	output: process.stdout,
});
const question = (query) => new Promise((resolve) => readline.question(query, resolve));

(async () => {
	let slug;
	let title;
	let category;

	for (;;) {
		for (;;) {
			slug = await question('slug: ');

			if (!slug || !(slug = String(slug).trim()) || !/^[a-z0-9][a-z0-9\-]{3,}[a-z0-9]$/.test(slug)) continue;

			break;
		}

		for (;;) {
			title = await question('title: ');

			if (!title || !(title = String(title).trim()) || !title.length) continue;

			break;
		}

		for (;;) {
			category = await question('category [empty to ignore]: ');

			if (!category || !(category = String(category).trim()) || !category.length) category = null;
			else if (!/^[a-z0-9]{3,}$/.test(category)) continue;

			break;
		}

		console.log();
		console.log(`slug: ${slug}`);
		console.log(`title: ${title}`);
		console.log(`category: ${category ?? '[omitted]'}`);

		const answer = String(await question('is it ok? [Yn]: ')).trim();

		if (!answer || answer === 'y' || answer === 'Y') break;
	}

	const now = Date.now();
	const name = `${now} ${slug}`;
	await fs.mkdir(join(process.cwd(), 'posts', name), { recursive: true });
	await fs.writeFile(
		join(process.cwd(), 'posts', name, 'metadata.json'),
		JSON.stringify({
			slug,
			title,
			category,
			'written-at': now,
		}),
		{
			encoding: 'utf-8',
		},
	);
	await fs.writeFile(join(process.cwd(), 'posts', name, 'content.md'), `\n> TODO: Write your post '${title}' here.\n`, {
		encoding: 'utf-8',
	});

	readline.close();
})();
