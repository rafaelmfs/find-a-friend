import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/**/*.ts"],
    splitting: false,
    sourcemap: true,
    clean: true,
    outDir: "build",
    minify: "terser",
  };
});
