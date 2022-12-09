const { SourceMapGenerator } = require("source-map");

// https://www.npmjs.com/package/source-map

var map = new SourceMapGenerator({
  file: "source-mapped.js",
});

map.addMapping({
  generated: {
    line: 10,
    column: 35,
  },
  source: "foo.js",
  original: {
    line: 33,
    column: 2,
  },
  name: "christopher",
});

console.log(map.toString());
// {"version":3,"sources":["foo.js"],"names":["christopher"],"mappings":";;;;;;;;;mCAgCEA","file":"source-mapped.js"}
