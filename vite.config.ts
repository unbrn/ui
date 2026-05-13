import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [
      react(),
      ...(isLib ? [
        dts({
          tsconfigPath: './tsconfig.lib.json',
          insertTypesEntry: true,
        })
      ] : []),
    ],
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'UnburnUI',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      cssFileName: 'styles',
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react-router-dom',
          'lucide-react',
          'clsx',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'ReactJSXRuntime',
            'lucide-react': 'LucideReact',
            'clsx': 'clsx',
          },
          preserveModules: false,
        },
      },
      sourcemap: true,
      minify: true,
      copyPublicDir: false,
    } : {
      // Standard App build for the documentation site
      outDir: 'dist-docs',
      target: 'esnext',
      cssMinify: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-syntax-highlighter')) return 'vendor-highlighter';
              if (id.includes('lucide-react')) return 'vendor-icons';
              if (id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor-react-core';
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
