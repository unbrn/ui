import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import basicSsl from '@vitejs/plugin-basic-ssl'

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
      ] : [
        basicSsl()
      ]),
    ],
    build: isLib ? {
      lib: {
        entry: {
          index: resolve(__dirname, 'package/index.ts'),
          'components/Accordion/Accordion': resolve(__dirname, 'package/components/Accordion/Accordion.tsx'),
          'components/Alert/Alert': resolve(__dirname, 'package/components/Alert/Alert.tsx'),
          'components/Avatar/Avatar': resolve(__dirname, 'package/components/Avatar/Avatar.tsx'),
          'components/Badge/Badge': resolve(__dirname, 'package/components/Badge/Badge.tsx'),
          'components/Button/Button': resolve(__dirname, 'package/components/Button/Button.tsx'),
          'components/Checkbox/Checkbox': resolve(__dirname, 'package/components/Checkbox/Checkbox.tsx'),
          'components/CodeBlock/CodeBlock': resolve(__dirname, 'package/components/CodeBlock/CodeBlock.tsx'),
          'components/Dock/Dock': resolve(__dirname, 'package/components/Dock/Dock.tsx'),
          'components/Dropzone/Dropzone': resolve(__dirname, 'package/components/Dropzone/Dropzone.tsx'),
          'components/Input/Input': resolve(__dirname, 'package/components/Input/Input.tsx'),
          'components/Select/Select': resolve(__dirname, 'package/components/Select/Select.tsx'),
          'components/Switch/Switch': resolve(__dirname, 'package/components/Switch/Switch.tsx'),
          'components/Slider/Slider': resolve(__dirname, 'package/components/Slider/Slider.tsx'),
          'components/Tooltip/Tooltip': resolve(__dirname, 'package/components/Tooltip/Tooltip.tsx'),
          'components/Textarea/Textarea': resolve(__dirname, 'package/components/Textarea/Textarea.tsx'),
          'components/Steps/Steps': resolve(__dirname, 'package/components/Steps/Steps.tsx'),
          'components/VoiceAgent/VoiceAgent': resolve(__dirname, 'package/components/VoiceAgent/VoiceAgent.tsx'),
          'lib/utils': resolve(__dirname, 'package/lib/utils.ts'),
          'lib/colors': resolve(__dirname, 'package/lib/colors.ts'),
        },
        name: 'UnburnUI',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
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
          'react-syntax-highlighter',
          'react-syntax-highlighter/dist/esm/prism',
          'react-syntax-highlighter/dist/esm/styles/prism',
        ],
        output: {
          banner: '"use client";',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'ReactJSXRuntime',
            'lucide-react': 'LucideReact',
            'clsx': 'clsx',
          },
          preserveModules: true,
          preserveModulesRoot: 'package',
        },
      },
      sourcemap: true,
      minify: true,
      copyPublicDir: false,
    } : {
      // Standard App build for the documentation site
      outDir: 'dist-docs',
      target: ['chrome90', 'firefox90', 'safari15', 'edge90'],
      cssMinify: false, // Disabling minification temporarily to preserve prefixes or use a better minifier
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
