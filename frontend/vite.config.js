import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    
    resolve: {
      alias: {
        // Allows using '@' to refer to the 'src' directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: 3000,
      strictPort: true,
      host: true, // Needed for Docker/ChromeOS development
      proxy: {
        // Proxying API requests to avoid CORS issues during development
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: 'terser', // Higher compression for production
    },
  };
});
