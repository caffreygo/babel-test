const babel = require("@babel/core");

const sourceCode = `
    new Array(5).fill('1');
`;

const { code, map } = babel.transformSync(sourceCode, {
  plugins: [],
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage",
        targets: {
          // chrome 44 会自动引入，版本 45 及以上内置不需要
          browsers: "Chrome 44",
        },
        corejs: 3,
      },
    ],
  ],
});

console.log(code);

// "use strict";

// require("core-js/modules/es.array.fill.js");
// new Array(5).fill('1');
