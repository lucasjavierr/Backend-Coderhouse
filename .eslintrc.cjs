module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    "standard",
    "eslint:recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: [
    "react"
  ],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "space-before-function-paren": ["error", "always"],
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
}
