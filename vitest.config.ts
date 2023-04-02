import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  // to test in server environment, run with "--mode ssr" or "--mode test:ssr" flag
  // loads only server.test.ts file
  // const testSSR = mode === 'test:ssr' || mode === 'ssr'

  return {
    plugins: [
      solidPlugin({
        // https://github.com/solidjs/solid-refresh/issues/29
        hot: false,
        // For testing SSR we need to do a SSR JSX transform
        solid: { generate: 'dom' },
      }),
    ],
    test: {
      watch: false,
      isolate: true,
      env: {
        NODE_ENV: 'development',
        DEV: '1',
        SSR: '',
        PROD: '',
      },
      environment: 'jsdom',
      transformMode: { web: [/\.[jt]sx$/] },
      include: ['test/*.test.{ts,tsx}'],
      exclude: ['test/server.test.{ts,tsx}'],
      setupFiles: ['test/setup.ts'],
    },
    resolve: {
      conditions: ['browser', 'development'],
    },
  };
});
