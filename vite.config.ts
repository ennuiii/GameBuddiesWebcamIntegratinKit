import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GameBuddiesWebcamKit',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'socket.io-client',
        '@mediapipe/tasks-vision',
        'three',
        'three/examples/jsm/loaders/GLTFLoader.js',
        'lucide-react'
      ],
      output: {
        // Global vars for UMD build (if we add it later)
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'socket.io-client': 'io',
          '@mediapipe/tasks-vision': 'MediaPipeTasks',
          three: 'THREE',
          'lucide-react': 'LucideReact'
        },
        // Preserve CSS imports
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name || 'assets/[name][extname]';
        }
      }
    },
    // Output to dist folder
    outDir: 'dist',
    // Clean dist before build
    emptyOutDir: true,
    sourcemap: true,
    // CSS code splitting
    cssCodeSplit: false
  }
});
