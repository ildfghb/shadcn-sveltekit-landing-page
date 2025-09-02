import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: 'index.html',
      precompress: false
    }),
    prerender: {
      crawl: true,
      handleHttpError: ({ path, status, message }) => {
        if (path === '/newpage' || path.startsWith('/newpage/')) {
          if (status === 404) return;
        }
        throw new Error(`${status} ${path}: ${message}`);
      }
    }
  }
};
export default config;
