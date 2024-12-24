import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA} from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '구인구직',
        short_name: '구인구직',
        description: '쉽고 편리한 구인구직 서비스',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
