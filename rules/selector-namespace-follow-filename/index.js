'use strict'

const isString = require('lodash.isstring')
const stylelint = require('stylelint')
const namespace = require('../../utils/namespace')
const path = require('path')
const msgPrefix = require('../../utils/messagePrefix')
const ruleName = namespace('selector-namespace-follow-filename')
const matchesStringOrRegExp = require('../../utils/matchesStringOrRegExp')
const postcss = require('postcss')
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (selector, namespace) => `${msgPrefix.main} Expected selector "${selector}" to match source filename as namespace "${namespace}".`
})

function rule(actual, options) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      { actual },
      {
        actual: options,
        possible: {
          fileDirWhiteList: [isString],
          filenameWhitelist: [isString]
        },
        optional: true
      }
    )

    if (!validOptions) {
      return
    }

    root.walkRules(rule => {
      // 仅检测根节点的选择器名字
      // 修正在webstorm 上找不到源文件的 bug
      if (!rule.source.input.file || rule.parent.type !== 'root') {
        return
      }

      // console.log(typeof rule.source.input.file)

      // 从代码源scss文件中获取到命名空间
      const fileDirArray = rule.source.input.file.split(path.sep)
      const fileDir = fileDirArray[fileDirArray.length - 2]
      // console.log(fileDir)
      let filename = path.basename(rule.source.input.file, '.scss')
      let filenameSpace = filename.replace('_', '').toLowerCase()
      const ruleSelector = rule.selector.toLowerCase()

      // 排除 % 这些placehoder及 id 选择器
      if (ruleSelector.indexOf('%') > -1 || ruleSelector.indexOf('#') > -1) {
        return
      }

      // 排除特殊目录
      const fileDirWhiteList = options.fileDirWhiteList
      // console.log(fileDirWhiteList)
      if (matchesStringOrRegExp(postcss.vendor.unprefixed(fileDir), fileDirWhiteList)) {
        return
      }

      // 排除 国际化相关
      if (ruleSelector.indexOf('lang_en') > -1) {
        return
      }

      // 排除特殊文件名
      const filenameWhitelist = options.filenameWhitelist
      if (matchesStringOrRegExp(postcss.vendor.unprefixed(filename), filenameWhitelist)) {
        return
      }

      // 排除 ww_开头的
      if (fileDir.indexOf('widget') > -1 && ruleSelector.indexOf('ww') > -1) {
        return
      }

      // 兼容 open 项目的情况
      // console.log(filenameSpace)
      if (filenameSpace.indexOf('wwopen') > -1) {
        // 匹配 _wwopen, _wwopen_, wwopen_, wwopen
        filenameSpace = filenameSpace.replace(/^_?wwopen_?/, '')
      }

      // 命名空间对比
      if (ruleSelector.split('_')[0].replace('.', '') === filenameSpace) {
        return
      }

      stylelint.utils.report({
        message: messages.expected(ruleSelector, filenameSpace),
        node: rule,
        result,
        ruleName
      })
    })
  }
}

rule.ruleName = ruleName
rule.messages = messages
module.exports = rule
