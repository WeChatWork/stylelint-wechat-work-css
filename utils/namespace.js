const prefix = 'wechat-work'

module.exports = function namespace (ruleName) {
  return `${prefix}/${ruleName}`
}
