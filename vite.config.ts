import type { InlineConfig } from 'vitest';
import type { UserConfig } from 'vite';
import {defineConfig} from "vite";

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
};
export default defineConfig(config);