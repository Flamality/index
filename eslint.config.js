import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },

  js.configs.recommended,

  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": "error",
      "no-unused-vars": "off",
      "no-useless-escape": "off",
    },
  },

  {
    files: ["functions/**/*.js", "functions/**/*.jsx"],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": "error",
    },
  },
];
