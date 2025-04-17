import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables access from external devices
    port: 5173, // Optional: Customize the port if needed
  },
})
