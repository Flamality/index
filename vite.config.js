import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
	plugins: [
		react(),
		mdx({
			remarkPlugins: [],
			rehypePlugins: [],
		}),
	],
	server: {
		port: 3000,
	},
	css: {
		modules: {
			localsConvention: "camelCase",
			scopeBehaviour: "local",
			generateScopedName: "[local]_[hash:5]",
		},
	},
});
