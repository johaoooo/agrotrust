import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permet les connexions externes
    allowedHosts: [
      'localhost',
      '.ngrok-free.dev', // Autorise tous les sous-domaines ngrok
      '.ngrok.io', // Anciens domaines ngrok
    ],
    port: 5173,
  },
})
