import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import postcss from './postcss.config.js';

export default defineConfig({
  plugins: [
    sveltekit(),
    // svelte({
    //   compilerOptions: {
    //     dev: true,
    //   },
    // }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  css: {
    postcss
  },
  build: {},
  server: {
    fs: {
      allow: [
        "./public/globals.css"
      ]
    },
    cors: true,
    open: false,
    port: 3000,
    proxy: {
      "/ws": {
        target: "ws://localhost:8080/ws",
        ws: true,
      }
    },
  },
});
