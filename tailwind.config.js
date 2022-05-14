module.exports = {
	purge: { enabled: true, content: ['./src/**/*.html', './src/**/*.svelte', './src/**/*.css'] },
	darkMode: false,
	theme: {
		colors: {
			current: 'currentColor',
			lightblue: '#5090BF',
			wine: '#CE4972',
			lightgray: '#CCCCCC',
			gray: '#6A8191',
			yellow: '#FFA71A',
			red: '#F85931',
			black: '#222222',
			light: '#B3C2CC',
			white: 'white',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
