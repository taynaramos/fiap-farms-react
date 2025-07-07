// vite.config.ts
import { federation } from "file:///Users/tayna.ramos/Estudos/mf_web/login/node_modules/.pnpm/@module-federation+vite@1.1.5_@types+node@18.19.42_lightningcss@1.30.1_rollup@4.19.1/node_modules/@module-federation/vite/lib/index.cjs";
import tailwindcss from "file:///Users/tayna.ramos/Estudos/mf_web/login/node_modules/.pnpm/@tailwindcss+vite@4.1.11_vite@5.2.10_@types+node@18.19.42_lightningcss@1.30.1_/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///Users/tayna.ramos/Estudos/mf_web/login/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.2.10_@types+node@18.19.42_lightningcss@1.30.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { writeFileSync } from "fs";
import path from "path";
import { defineConfig, loadEnv } from "file:///Users/tayna.ramos/Estudos/mf_web/login/node_modules/.pnpm/vite@5.2.10_@types+node@18.19.42_lightningcss@1.30.1/node_modules/vite/dist/node/index.js";

// package.json
var dependencies = {
  "@tailwindcss/vite": "^4.1.11",
  firebase: "^11.10.0",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  tailwindcss: "^4.1.11"
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/tayna.ramos/Estudos/mf_web/login";
var vite_config_default = defineConfig(({ mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    server: {
      fs: {
        allow: [".", "../shared"]
      }
    },
    build: {
      target: "chrome89"
    },
    plugins: [
      {
        name: "generate-environment",
        options: function() {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/environment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`
          );
        }
      },
      federation({
        filename: "remoteEntry.js",
        name: "login",
        exposes: {
          "./login-app": "./src/App.tsx"
        },
        remotes: {},
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true
          }
        }
      }),
      react(),
      tailwindcss()
    ],
    define: {
      "import.meta.env": {
        ...selfEnv
      }
    },
    resolve: {
      alias: {
        shared: path.resolve(__vite_injected_original_dirname, "../shared")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RheW5hLnJhbW9zL0VzdHVkb3MvbWZfd2ViL2xvZ2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGF5bmEucmFtb3MvRXN0dWRvcy9tZl93ZWIvbG9naW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RheW5hLnJhbW9zL0VzdHVkb3MvbWZfd2ViL2xvZ2luL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmVkZXJhdGlvbiB9IGZyb20gXCJAbW9kdWxlLWZlZGVyYXRpb24vdml0ZVwiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBkZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBzZWxmRW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcblxuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgZnM6IHtcbiAgICAgICAgYWxsb3c6IFtcIi5cIiwgXCIuLi9zaGFyZWRcIl0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogXCJjaHJvbWU4OVwiLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcImdlbmVyYXRlLWVudmlyb25tZW50XCIsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXCJzZWxmRW52XCIsIHNlbGZFbnYpO1xuICAgICAgICAgIHdyaXRlRmlsZVN5bmMoXG4gICAgICAgICAgICBcIi4vc3JjL2Vudmlyb25tZW50LnRzXCIsXG4gICAgICAgICAgICBgZXhwb3J0IGRlZmF1bHQgJHtKU09OLnN0cmluZ2lmeShzZWxmRW52LCBudWxsLCAyKX07YFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZmVkZXJhdGlvbih7XG4gICAgICAgIGZpbGVuYW1lOiBcInJlbW90ZUVudHJ5LmpzXCIsXG4gICAgICAgIG5hbWU6IFwibG9naW5cIixcbiAgICAgICAgZXhwb3Nlczoge1xuICAgICAgICAgIFwiLi9sb2dpbi1hcHBcIjogXCIuL3NyYy9BcHAudHN4XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW90ZXM6IHt9LFxuICAgICAgICBzaGFyZWQ6IHtcbiAgICAgICAgICByZWFjdDoge1xuICAgICAgICAgICAgcmVxdWlyZWRWZXJzaW9uOiBkZXBlbmRlbmNpZXMucmVhY3QsXG4gICAgICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIHRhaWx3aW5kY3NzKCksXG4gICAgXSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIFwiaW1wb3J0Lm1ldGEuZW52XCI6IHtcbiAgICAgICAgLi4uc2VsZkVudixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBzaGFyZWQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zaGFyZWQnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwibW9kdWxlLWZlZGVyYXRpb24tdml0ZS1yZWFjdC1sb2dpblwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGUgLS1wb3J0IDQxNzVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJucG0gcnVuIGJ1aWxkICYmIHZpdGUgcHJldmlldyAtLXBvcnQgNDE3NVwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0YWlsd2luZGNzcy92aXRlXCI6IFwiXjQuMS4xMVwiLFxuICAgIFwiZmlyZWJhc2VcIjogXCJeMTEuMTAuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMy4xXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMy4xXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl40LjEuMTFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbW9kdWxlLWZlZGVyYXRpb24vdml0ZVwiOiBcIjEuMS41XCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCIxOC4yLjc5XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiMTguMi4yNVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCI0LjIuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXG4gICAgXCJ2aXRlXCI6IFwiNS4yLjEwXCJcbiAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxrQkFBa0I7QUFDbFUsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQWMsZUFBZTs7O0FDSXBDLG1CQUFnQjtBQUFBLEVBQ2QscUJBQXFCO0FBQUEsRUFDckIsVUFBWTtBQUFBLEVBQ1osT0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsYUFBZTtBQUNqQjs7O0FEZkYsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxVQUFVLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUUzQyxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixJQUFJO0FBQUEsUUFDRixPQUFPLENBQUMsS0FBSyxXQUFXO0FBQUEsTUFDMUI7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFNBQVMsV0FBWTtBQUNuQixrQkFBUSxLQUFLLFdBQVcsT0FBTztBQUMvQjtBQUFBLFlBQ0U7QUFBQSxZQUNBLGtCQUFrQixLQUFLLFVBQVUsU0FBUyxNQUFNLENBQUMsQ0FBQztBQUFBLFVBQ3BEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNULFVBQVU7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsU0FBUyxDQUFDO0FBQUEsUUFDVixRQUFRO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTCxpQkFBaUIsYUFBYTtBQUFBLFlBQzlCLFdBQVc7QUFBQSxVQUNiO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLG1CQUFtQjtBQUFBLFFBQ2pCLEdBQUc7QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsUUFBUSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
