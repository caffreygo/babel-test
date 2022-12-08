const acorn = require("acorn");
const jcKeywordPlugin = require('./jcKeywordPlugin');

const Parser = acorn.Parser;

const newParser = Parser.extend(jcKeywordPlugin);

var program = 
`
    jc
    const a = 1
`;

const ast = newParser.parse(program);
console.log(ast);