import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    base: isProd ? '/PRANAV_PORTFOLIO/' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
