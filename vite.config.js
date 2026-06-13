import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base is set to './' so the production build works when served from any
// sub-path (e.g. GitHub Pages project sites) without extra configuration.
export default defineConfig({
  plugins: [react()],
  base: './',
});
