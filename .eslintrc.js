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
    "capitalized-comments": "off",
    "max-params": "off",
  },
};
