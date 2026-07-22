import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) return 'vendor_icons';
              if (id.includes('motion')) return 'vendor_motion';
              if (id.includes('react')) return 'vendor_react';
              if (id.includes('recharts')) return 'vendor_recharts';
              if (id.includes('d3')) return 'vendor_d3';
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
