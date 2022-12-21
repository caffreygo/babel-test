const babel = require("@babel/core");

const sourceCode = `
    new Array(5).fill('1');
`;

const { code, map } = babel.transformSync(sourceCode, {
  plugins: [
    [
      "@babel/transform-runtime",
      {
        corejs: 3,
      },
    ],
  ],
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage",
        targets: {
          browsers: "Chrome 45",
        },
        corejs: 3,
      },
    ],
  ],
});

// plugin先应用，plugin-transform-runtime 在 preset-env 前面
// 从而导致做了多余的转换
console.log(code);
// "use strict";

// var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
// var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));
// var _context;
// (0, _fill.default)(_context = new Array(5)).call(_context, '1');