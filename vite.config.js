import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio-V2/',  // ← add this, must match your GitHub repo name exactly
})
