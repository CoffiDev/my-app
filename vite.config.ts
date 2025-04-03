// import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vitest/config';
// import ssrHotReload from 'vite-plugin-ssr-hot-reload'

export default defineConfig({
  // plugins: [ssrHotReload(), cloudflare()],
  plugins: [], // Remove cloudflare() plugin for test run
  test: {
    pool: '@cloudflare/vitest-pool-workers',
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.jsonc' },
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
