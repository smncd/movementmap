import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 9000
  },
  build: {
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'MovementMap',
      formats: ['umd'],
      fileName: () => 'movementmap.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css'
            ? 'movementmap.css'
            : assetInfo.name,
      },
    },
  },
});
