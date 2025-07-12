import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig, loadEnv } from "vite";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

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
            requiredVersion: pkg.dependencies.react,
            singleton: true,
          },
          "react-dom": {
            requiredVersion: pkg.dependencies["react-dom"],
            singleton: true,
          },
          "@emotion/react": {
            requiredVersion: pkg.dependencies["@emotion/react"],
            singleton: true,
          },
          "@emotion/styled": {
            requiredVersion: pkg.dependencies["@emotion/styled"],
            singleton: true,
          },
          firebase: {
            requiredVersion: pkg.dependencies.firebase,
            singleton: true,
          },
          "firebase/app": {
            singleton: true,
          },
          "firebase/auth": {
            singleton: true,
          },
          "firebase/firestore": {
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
