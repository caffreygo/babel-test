const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);

// 作为插件用的时候，不需要自己调用 parse、traverse、generate，通用流程 babel 会做
// 我们只需要提供一个 visitor 函数，在这个函数内完成转换功能就行了 (api, options) => ({})
module.exports = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const calleeName = path.get("callee").toString();
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          const newNode = template.expression(
            `console.log("${
              state.filename || "unkown filename"
            }: (${line}, ${column})")`
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
    },
  };
};
