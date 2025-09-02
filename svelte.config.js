import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // 主页按 SPA 输出
      fallback: 'index.html',
      precompress: false
    }),

    // 关键：构建期预渲染时，遇到 /newpage（由 Traefik 反代到外部 dashboard）的 404 直接忽略
    prerender: {
      // 保持默认爬链（也可以显式写 true）
      crawl: true,
      handleHttpError: ({ path, status, message }) => {
        if (path === '/newpage' || path.startsWith('/newpage/')) {
          if (status === 404) return; // 忽略 dashboard 占用路径的 404
        }
        throw new Error(`${status} ${path}: ${message}`);
      }
    }
  }
};

export default config;
