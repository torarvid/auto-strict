var module = require('module')
var compile = module.prototype._compile
var path = require('path')

module.prototype._compile = function (content, filename) {
  var isThirdParty = filename.startsWith(path.join(__dirname, 'node_modules'))
  if (!isThirdParty) {
    content = "'use strict';" + content
  }
  return compile.call(this, content, filename)
}
