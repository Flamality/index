// postcss.config.js
export default {
  plugins: {
    autoprefixer: {},
    "postcss-nesting": {},
    "postcss-mixins": {
      mixinsFiles: "src/styles/packages/Typography.css",
    },
  },
};
