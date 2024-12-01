import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  define: {
    __AuthorInfo__: {
      name: "Kamenomi-dev",
      github_url: "https://github.com/kamenomi-dev"
    },
    __ProjectInfo__: {
      name: "IntroPage",
    }
  },
  plugins: [preact()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: 'true; @import "@/styles/layout.less"'
        },
        javascriptEnabled: true
      }
    }
  }
});
