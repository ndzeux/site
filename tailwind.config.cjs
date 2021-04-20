module.exports = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts,postcss}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'default': ['Monda', 'sans-serif'],
				'berait': ['Berkshire Swash', 'mono']
			},
			colors: {
				// palette
				dbluegray:'#033246',
				mbluegray:'#304B6A',
				vdpink:'#5F648C',
				dpink:'#927DA9',
				mpink:'#C796C1',
				npink:'#ad06e2',
				kpink:'#FCB1D2'
			}
		},
		
	},
	plugins: [],
};
