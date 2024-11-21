// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [{ find: "@", replacement: "/src" }],
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      '/users': {
        target: 'http://10.0.0.4:8080', // The backend IP and port
        changeOrigin: true,             // This ensures the target will be rewritten with the correct origin
        secure: false,                 // If using HTTPS, set this to true
      },
      // Add more proxies for different backend endpoints if needed
    },
  },
});
