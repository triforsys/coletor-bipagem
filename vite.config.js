import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ url }) => {
      //         return url.pathname.startsWith('/');
      //       },
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'bipagem-cache',
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //   ],
      //   cleanupOutdatedCaches: false,
      //   sourcemap: true,
      //   globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      // },
      includeAssets: [
        'favicon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
      ],
      manifest: {
        name: 'Bipagem',
        short_name: 'Bip',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'pt-br',
        background_color: '#f8fafc',
        start_url: '/',
        description: 'App para Bipagem.',
        theme_color: '#602d00',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
