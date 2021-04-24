module.exports = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			fontFamily: {
				'default': ['Rubik', 'sans-serif'],
				'berait': ['Nerko One', 'monospace']
			}
		},
	},
	plugins: [],
};
