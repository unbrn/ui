import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [react()],
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'unburn-ui',
        fileName: 'unburn-ui',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'lucide-react': 'Lucide',
          },
        },
      },
    } : {
      // Standard App build for the documentation site
      outDir: 'dist-docs',
      target: 'esnext',
      cssMinify: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-syntax-highlighter')) return 'vendor-highlighter';
              if (id.includes('lucide-react')) return 'vendor-icons';
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
