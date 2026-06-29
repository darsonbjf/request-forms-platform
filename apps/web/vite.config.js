import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Gera caminhos relativos
  build: {
    outDir: 'dist', // Garante que o build seja gerado na pasta correta
  },
});
