module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    ethers: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "script",
  },
  plugins: ["import"],

  rules: {
    "simple-import-sort/imports": "off",
    "import/first": "off",
    "import/newline-after-import": "off",
    "import/no-duplicates": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "no-undef": "off",
    "space-infix-ops": ["error", { int32Hint: false }],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "space-in-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "key-spacing": ["error", { beforeColon: true, afterColon: true }],
  },
};
