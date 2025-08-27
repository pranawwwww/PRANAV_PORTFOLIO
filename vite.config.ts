import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const hasCustomDomain = !!process.env.CUSTOM_DOMAIN;
  return {
    base: isProd ? (hasCustomDomain ? '/' : '/PRANAV_PORTFOLIO/') : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
