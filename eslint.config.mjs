import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import json from "@eslint/json";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
const jsonCompat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: json.configs.recommended});

export default [
  ...compat.extends("eslint:recommended"),
  ...jsonCompat,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: "readonly",
        firefox: "readonly",
      },

      ecmaVersion: 12,
      sourceType: "module",
    },

    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
