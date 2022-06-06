module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {

    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": "off",
  },
};
