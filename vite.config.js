import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: '/portfolio-3d-vuejs',
  server: {
    port: '8080',
  },
  plugins: [vue(), glsl()],
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@js', replacement: fileURLToPath(new URL('./src/js', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) },
      { find: '@images', replacement: fileURLToPath(new URL('./src/assets/images', import.meta.url)) },
      { find: '@icons', replacement: fileURLToPath(new URL('./src/assets/icons', import.meta.url)) },
      { find: '@fonts', replacement: fileURLToPath(new URL('./src/assets/fonts', import.meta.url)) },
      { find: '@styles', replacement: fileURLToPath(new URL('./src/styles', import.meta.url)) },
      { find: '@vars', replacement: fileURLToPath(new URL('./src/styles/vars', import.meta.url)) },
    ],
  },
});
