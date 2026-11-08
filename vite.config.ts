import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // Served from the domain root (Railway / custom domain).
    // Set BASE_PATH=/PRANAV_PORTFOLIO/ only to build for the github.io sub-path.
    base: process.env.BASE_PATH || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
