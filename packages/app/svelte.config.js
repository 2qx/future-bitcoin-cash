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
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: buildDir,
			assets: buildDir,
			
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
