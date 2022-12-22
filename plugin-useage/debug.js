const babel = require("@babel/core");

const sourceCode = `
async function func() {}
`;

const { code, map } = babel.transformSync(sourceCode, {
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        debug: true,
        targets: "chrome 30",
        corejs: 3,
      },
    ],
  ],
});

console.log(code);
