import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import postcss from './postcss.config.js'; // Tailwind PostCSS config

export default defineConfig({
  plugins: [
    svelte({
      // Optional: configure Svelte-specific options
      compilerOptions: {
        dev: true, // Enables Svelte in development mode
      },
    }),
  ],
  resolve: {
    alias: {
      // Alias to help with imports, can be customized
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
    postcss, // Adds Tailwind CSS and other PostCSS settings
  },
  build: {
    // outDir: 'dist', // Output directory for production build
    // assetsDir: 'assets', // Folder where assets will be placed
    // rollupOptions: {
    //   input: {
    //     main: path.resolve(__dirname, 'public', 'index.html'),
    //   }
    // },
  },
  server: {
    open: false, // Opens the browser when Vite dev server starts
    port: 3000, // Custom dev server port
  },
});
