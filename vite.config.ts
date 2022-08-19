import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Tinder Auto Swipe',
  description: 'This is a Chrome extension that automates Tinder swipes.',
  version: '1.0.0',
  icons: {
    '16': 'tinder-auto-swipe.png',
    '48': 'tinder-auto-swipe.png',
    '128': 'tinder-auto-swipe.png',
  },
  action: {
    default_popup: 'index.html',
  },
  content_scripts: [
    {
      matches: ['https://tinder.com/*'],
      js: ['src/content-script/index.ts'],
    },
  ],
  permissions: ['storage', 'tabs'],
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})
