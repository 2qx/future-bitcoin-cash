//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import toc from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import sveltePreprocess from 'svelte-preprocess';

const buildDir = process.env.NODE_ENV === 'production' ? '../../docs' : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		prerender:{
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/v' ) {
					return;
				}

				// otherwise fail the build
				throw new Error(message);
			}
		},
		adapter: adapter({
			pages: buildDir,
			assets: buildDir,
			handleHttpError: 'warn'
		})
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		sveltePreprocess({ sourceMap: false, handleMixedImports: true, reportDiagnostics: true }),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, 
        [toc, { headings: ['h1'] }]
      ],
			highlight: {
				alias: { cashscript: 'solidity' }
			}
		})
	]
};

export default config;
