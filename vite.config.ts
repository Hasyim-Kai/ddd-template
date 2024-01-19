import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@commons",
        replacement: path.resolve(__dirname, "src/commons"),
      },
      {
        find: "@data",
        replacement: path.resolve(__dirname, "src/data"),
      },
      {
        find: "@domain",
        replacement: path.resolve(__dirname, "src/domain"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
    ],
  },
});
