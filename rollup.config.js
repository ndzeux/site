import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
// import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
//
import cleaner from 'rollup-plugin-cleaner';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;
// const isDev = Boolean(process.env.ROLLUP_WATCH);

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
			bundle.close();
		}
	};
}

export default [
	// browser bundle
	{
		input: 'src/main.js',
		output: {
			sourcemap: false,
			format: 'es',
			name: 'app',
			dir: 'public/build/',
			chunkFileNames: '[name].js'
		},
		cache: false,
		treeshake: false,
		plugins: [
			cleaner({
				//   targets: [
				//     'public/build/'
				//   ]
			}),
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				},
				preprocess: sveltePreprocess({
					sourceMap: !production,
					postcss: {
						plugins: [
							require("tailwindcss"), 
							require("autoprefixer"),
							// require("postcss-nesting")
						],
					},
				}),
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({
				dir: 'public',
				output: 'bundle.css'
			}),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false,
		},
	},
	// // Server bundle
	// {
	// 	input: "src/App.svelte",
	// 	output: {
	// 		sourcemap: false,
	// 		format: "cjs",
	// 		name: "app",
	// 		file: "public/App.js",
	// 		inlineDynamicImports: true
	// 	},
	// 	plugins: [
	// 		svelte({
	// 			compilerOptions: {
	// 				generate: "ssr",
	// 			},
	// 		}),
	// 		css({ output: false }),
	// 		resolve({
	// 			browser: true,
	// 			dedupe: ["svelte"],
	// 		}),
	// 		commonjs(),
	// 		replace({
	// 			process: `(${JSON.stringify({ env: { NODE_ENV: "development" } })})`,
	// 			preventAssignment: true
	// 		}),
	// 		!isDev && terser(),
	// 	],
	// }
]
