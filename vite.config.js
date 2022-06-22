import { defineConfig } from "vite";

import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    eslint(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
