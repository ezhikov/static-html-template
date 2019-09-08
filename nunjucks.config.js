const nunjucks = require("nunjucks");

module.exports = {
  env: new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname))
};
