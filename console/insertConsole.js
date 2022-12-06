const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template").default;
const fs = require("fs");
const path = require("path");

const sourceCode = fs.readFileSync(path.join(__dirname, "./sourceCode.js"), {
  encoding: "utf8",
});

const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);

traverse(ast, {
  CallExpression(path, state) {
    if (path.node.isNew) {
      return;
    }
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;

      const newNode = template.expression(
        `console.log("filename: (${line}, ${column})")`
      )();
      newNode.isNew = true;

      if (path.findParent((path) => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]));
        path.skip();
      } else {
        path.insertBefore(newNode);
      }
    }
  },
});

const { code, map } = generate(ast);
console.log(code);
