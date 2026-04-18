import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ParkVault',
        short_name: 'ParkVault',
        description: 'Smart Parking & Rental Platform',
        theme_color: '#2563EB',
        background_color: '#F8FAFC',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/(.*)firebaseio\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firebase-api'
            }
          },
          {
            urlPattern: /^https:\/\/(.*)googleapis\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-api'
            }
          }
        ]
      }
    })
  ]
});
