const acorn = require("acorn");
const Parser = acorn.Parser;
const TokenType = acorn.TokenType;

Parser.acorn.keywordTypes["jc"] = new TokenType("jc", {
  keyword: "jc",
});

module.exports = function (Parser) {
  return class extends Parser {
    parse(program) {
      let newKeywords =
        "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
      newKeywords += " jc";
      this.keywords = new RegExp(
        "^(?:" + newKeywords.replace(/ /g, "|") + ")$"
      );
      return super.parse(program);
    }

    parseStatement(context, topLevel, exports) {
      var starttype = this.type;

      if (starttype == Parser.acorn.keywordTypes["jc"]) {
        var node = this.startNode();
        return this.parseJcStatement(node);
      } else {
        return super.parseStatement(context, topLevel, exports);
      }
    }

    parseJcStatement(node) {
      this.next();
      return this.finishNode({ value: "jc" }, "JcStatement"); //新增加的ssh语句
    }
  };
};
