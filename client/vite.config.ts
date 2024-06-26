import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api-v1/auth": {
                target: "http://localhost:8800/",
                changeOrigin: true,
                secure: false,
            },
            "/api-v1": {
                target: "http://localhost:8080/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
