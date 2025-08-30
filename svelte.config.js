import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// 确保生成 SPA 所需的 fallback 页面
			fallback: 'index.html',
			// 预压缩可以提高性能，但在调试时可以先禁用
			precompress: false
		})
	}
};

export default config;