import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(({ mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());

  return {
    server: { fs: { allow: [".", "../shared"] } },
    build: {
      target: "chrome89",
    },
    plugins: [
      federation({
        name: "host",
        remotes: {
          remote: {
            type: "module",
            name: "remote",
            entry: "http://localhost:4174/remoteEntry.js",
            entryGlobalName: "remote",
            shareScope: "default",
          },
          login: {
            type: "module",
            name: "login",
            entry: "http://localhost:4175/remoteEntry.js",
            entryGlobalName: "login",
            shareScope: "default",
          },
        },
        exposes: {},
        filename: "remoteEntry.js",
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true,
          },
          firebase: {
            requiredVersion: dependencies.firebase,
            singleton: true,
          },
        },
      }),
      react(),
    ],
    define: {
      "import.meta.env": {
        ...selfEnv,
      },
    },
    resolve: {
      alias: {
        shared: path.resolve(__dirname, '../shared'),
      },
    },
  };
});
