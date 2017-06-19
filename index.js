var module = require('module')
var compile = module.prototype._compile
var path = require('path')

var index = __dirname.indexOf('node_modules')
var nodeModulesDir = (index < 1) ? path.join(__dirname, 'node_modules') : __dirname.substr(0, index + 12)

module.prototype._compile = function (content, filename) {
  var isThirdParty = filename.startsWith(nodeModulesDir)
  if (!isThirdParty) {
    content = "'use strict';" + content
  }
  return compile.call(this, content, filename)
}
