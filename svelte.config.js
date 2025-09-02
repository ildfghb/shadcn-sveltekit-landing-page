import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // 主页仍按 SPA 方式构建
      fallback: 'index.html',
      precompress: false
    }),

    // 关键：不要在构建期去预渲染 /newpage（该路径由 Traefik 反代到外部 dashboard）
    prerender: {
      entries: ['*', '!/newpage'],
      handleHttpError: ({ path, status, message }) => {
        if (path === '/newpage' && status === 404) return; // 忽略这条
        throw new Error(`${status} ${path}: ${message}`);
      }
    }
  }
};

export default config;
