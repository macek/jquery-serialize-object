var pkg = require("../package.json");

var year = (new Date()).getFullYear();

var lines = [
  "/**",
  " * " + pkg.plugin.name,
  " * @copyright " + year + ", " + pkg.author,
  " * @link " + pkg.repository.url,
  " * @license " + pkg.license,
  " * @version " + pkg.version,
  " */"
];

console.log(lines.join("\n"));
