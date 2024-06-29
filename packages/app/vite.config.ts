import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: ["esnext"], // for bigints
		commonjsOptions: {
			transformMixedEsModules: true,
			// linked modules in a monorepo must be explicitly included
			include: [/@fbch\/lib/, /node_modules/]
		},
		rollupOptions: {
			output: {
				sourcemap: true,
				name: 'app',
				globals: {
					events: 'Event',
					tls: 'undefined',
					net: 'undefined'
				}
			},
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
