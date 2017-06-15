var module = require('module')
var compile = module.prototype._compile
var path = require('path')

var index = __dirname.indexOf('node_modules')
var baseDirectory = (index < 1) ? __dirname : __dirname.substr(0, index - 1)

module.prototype._compile = function (content, filename) {
  var isThirdParty = filename.startsWith(path.join(baseDirectory, 'node_modules'))
  if (!isThirdParty) {
    content = "'use strict';" + content
  }
  return compile.call(this, content, filename)
}
