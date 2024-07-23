import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			// To exclude specific polyfills, add them to this list.
			exclude: [
				'fs', // Excludes the polyfill for `fs` and `node:fs`.
			],
			// Whether to polyfill specific globals.
			globals: {
				Buffer: true, // can also be 'build', 'dev', or false
				global: true,
				process: false,
			},
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true,
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: ["esnext"], // for bigints
		commonjsOptions: {
			transformMixedEsModules: true,
			// linked modules in a monorepo must be explicitly included
			include: [/@fbch\/lib/, /node_modules/]
		},
		sourcemap: true,
		rollupOptions: {
			output: {
				name: 'app',
				globals: {
					events: 'undefined',
					tls: 'undefined',
					net: 'undefined'
				},

			},
			external: [
				'vite-plugin-node-polyfills/shims/process'
			],
			context: 'window'
		}
	},
	define: {
		'process.env': process.env
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
