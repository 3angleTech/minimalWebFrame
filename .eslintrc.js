module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    '@3angletech/eslint-config/node',
  ],
  root: true,
  env: {
    browser: true,
    jasmine: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "^~[^/]+/[^/]+$",
          "@angular/common/http",
          "@angular/core/testing",
        ]
      }
    ],
    // ESlint is too aggresive. Even if I don't use deprecated APIs, it still shows errors if the definition of the library has marked
    // some of it's APIs as deprecated
    "import/no-deprecated": "off",
    "no-any": 0, // Disable ESLint no-any rule
    "@typescript-eslint/no-explicit-any": 0,   // Disables the TypeScript-specific rule
    "capitalized-comments": "off",
    "max-params": "off",
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.app.json',
      },
    },
  },
};
