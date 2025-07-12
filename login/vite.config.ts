import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { defineConfig, loadEnv } from "vite";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig(({ mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());

  return {
    server: {
      fs: {
        allow: [".", "../shared"],
      },
    },
    build: {
      target: "chrome89",
    },
    plugins: [
      {
        name: "generate-environment",
        options: function () {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/environment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`
          );
        },
      },
      federation({
        filename: "remoteEntry.js",
        name: "login",
        exposes: {
          "./login-app": "./src/App.tsx",
        },
        remotes: {},
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
