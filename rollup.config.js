require('dotenv').config();

const { getRollupConfig } = require('@elderjs/elderjs');
import inlineSvg from 'rollup-plugin-inline-svg';

const svelteConfig = require('./svelte.config');

const configs = getRollupConfig({ svelteConfig });

for (let config of configs)
	config.plugins.push(
		inlineSvg({
			removeTags: true,
		}),
	);

module.exports = configs;
