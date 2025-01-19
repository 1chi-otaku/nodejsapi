export default [
    {
      files: ["**/*.{js,ts}"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
      },
    },
  ];
  