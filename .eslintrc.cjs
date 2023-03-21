/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: "18.2.0",
    },
    "import/core-modules": ["vite", "@vitejs/plugin-react"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescirpt-eslint/no-shadow": "off",
    "react/display-name": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-used-vars": "warn",
  },
};
