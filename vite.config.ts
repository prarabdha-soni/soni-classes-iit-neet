import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async ({ command, mode }) => {
  const plugins = [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
  ];

  const deployVercel = command === "build" && Boolean(process.env.VERCEL);

  if (deployVercel) {
    // Vercel: Nitro emits the serverless handler + static assets (Cloudflare output is not used).
    plugins.push(...tanstackStart());
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro());
    plugins.push(react());
  } else {
    if (command === "build") {
      const { cloudflare } = await import("@cloudflare/vite-plugin");
      plugins.push(cloudflare({ viteEnvironment: { name: "ssr" } }));
    }
    plugins.push(...tanstackStart(), react());
  }

  const envDefine: Record<string, string> = {};
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins,
    server: {
      host: "::",
      port: 8080,
    },
  };
});
