const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
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
    // const calleeName = generate(path.node.callee).code;
    const calleeName = path.get("callee").toString();

    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(
        types.stringLiteral(`filename: (${line}, ${column})`)
      );
    }
    // if (
    //   types.isMemberExpression(path.node.callee) &&
    //   path.node.callee.object.name === "console" &&
    //   ["log", "info", "error", "debug"].includes(path.node.callee.property.name)
    // ) {
    //   const { line, column } = path.node.loc.start;
    //   path.node.arguments.unshift(
    //     types.stringLiteral(`filename: (${line}, ${column})`)
    //   );
    // }
  },
});

const { code, map } = generate(ast);
console.log(code);
