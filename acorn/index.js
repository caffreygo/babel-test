const acorn = require("acorn");
const guangKeywordPlugin = require('./jcKeywordPlugin');

const Parser = acorn.Parser;

const newParser = Parser.extend(guangKeywordPlugin);

var program = 
`
    jc
    const a = 1
`;

const ast = newParser.parse(program);
console.log(ast);