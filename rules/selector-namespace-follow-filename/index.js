'use strict'

const stylelint = require('stylelint')
const namespace = require('../../utils/namespace')
const path = require('path')
const msgPrefix = require('../../utils/messagePrefix')
const ruleName = namespace('selector-namespace-follow-filename')
const matchesStringOrRegExp = require('../../utils/matchesStringOrRegExp')
const postcss = require('postcss')
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (selector, namespace) => `${msgPrefix.main} Expected selector "${selector}" to match source filename as namespace "${namespace}".`,
})

function rule (actual) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual})
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

      // 排除组件，特殊目录下的非业务代码
      // if (fileDir.indexOf('logic') <= 0) {
      //   return
      // }

      // 排除特殊目录
      /* if (fileDir.indexOf('mobile') > -1 || fileDir.indexOf('singlePage') > -1 || fileDir.indexOf('widget_official') > -1 || fileDir.indexOf('component') > -1) {
         return
       }*/
      const fileDirWhiteList = ['mobile', 'singlePage', /^widget/, 'component']
      if (matchesStringOrRegExp(postcss.vendor.unprefixed(fileDir), fileDirWhiteList)) {
        return
      }

      // 排除文件名中含有 base,basic 等字样的，基础文件，不受命名空间的约束
      /*if (filename.indexOf('base') > -1 || filename.indexOf('basic') > -1 || filename.indexOf('hotfix') > -1 || filename.indexOf('widget') > -1) {
        return
      }*/
      const filenameWhitelist = ['/^base/', '/^basic/', 'hotfix', 'widget']
      if (matchesStringOrRegExp(postcss.vendor.unprefixed(filename), filenameWhitelist)) {
        return
      }

      // 排除 ww_开头的
      if (fileDir.indexOf('widget') > -1 && ruleSelector.indexOf('ww') > -1) {
        return
      }

      // // 兼容 open 项目的情况
      // console.log(filenameSpace)
      if (filenameSpace.indexOf('wwopen_') > -1) {
        filenameSpace = filenameSpace.replace('wwopen_', '')
      }

      // 命名空间对比
      if (ruleSelector.split('_')[0].replace('.', '') === filenameSpace) {
        return
      }

      stylelint.utils.report({
        message: messages.expected(ruleSelector, filenameSpace),
        node: rule,
        result,
        ruleName,
      })
    })
  }
}

rule.ruleName = ruleName
rule.messages = messages
module.exports = rule
