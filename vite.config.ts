import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching and faster loading
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Framer Motion - separate chunk due to size
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // Other UI libraries
            if (id.includes('lucide-react') || id.includes('sonner')) {
              return 'ui-libs';
            }
            // Query and form libraries
            if (id.includes('@tanstack') || id.includes('react-hook-form')) {
              return 'query-form';
            }
            // Everything else
            return 'vendor';
          }
        },
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext ?? '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Increase chunk size warning limit for production
    chunkSizeWarningLimit: 1000,
    // Enable minification with esbuild (faster than terser)
    minify: 'esbuild',
    // Improve build performance
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps for production
    // Reduce bundle size
    target: 'es2015',
    reportCompressedSize: false, // Faster builds
    // Ensure proper base path for Vercel
    outDir: 'dist',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-toast',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
    ],
    exclude: ['lovable-tagger'],
  },
  // Improve development server performance
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
