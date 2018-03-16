'use strict'

const stylelint = require('stylelint')
const namespace = require('../../utils/namespace')
const msgPrefix = require('../../utils/messagePrefix')
const ruleName = namespace('declaration-use-variable')
let messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `${msgPrefix.main} Excepted to use '%a' in '%b' prop `
})

function checkValue (val) {
  // Regex for checking
  // scss variable starting with '$'
  // map-get function in scss
  // less variable starting with '@'
  // custom properties starting with '--' or 'var'
  var regEx = /^(\$)|(map-get)|(\@)|(--)|(var)/g

  // color functions starting with 'color('
  if (val.indexOf('color(') > -1) {
    return true
  }
  return regEx.test(val)
}

function msgOutput (variable, prop) {
  return messages.rejected.replace('%a', variable).replace('%b', prop)
}

function rule (actual) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual})
    if (!validOptions) {
      return
    }

    // 默认的提示信息
    const propsList = ['color', 'background', 'background-image', 'border', 'border-color']

    /**
     * color: #787878 => $common_color_gray
     * background-image: indepent => $img_path
     * border, boder-color:  => $common_color_lightBorder, $common_color_border
     */
    root.walkDecls(decl => {
      // 排除非罗列的 props
      if (propsList.indexOf(decl.prop) <= -1) {
        return
      }

      // 如果 value 已经变量化，则排除
      if (checkValue(decl.value)) {
        return
      }

      if (decl.prop === 'color') {
        if (decl.value.indexOf('#787878') > -1) {
          stylelint.utils.report({
            message: msgOutput('$common_color_gray', 'color'),
            node: decl,
            result,
            ruleName
          })
          return
        } else if (decl.value.toUpperCase().indexOf('#38689F') > -1) {
          stylelint.utils.report({
            message: msgOutput('$common_color_blue', 'color'),
            node: decl,
            result,
            ruleName
          })
          return
        } else if (decl.value.toUpperCase().indexOf('#F05A5A') > -1) {
          stylelint.utils.report({
            message: msgOutput('$$common_color_red', 'color'),
            node: decl,
            result,
            ruleName
          })
          return
        }
      }

      if ((decl.prop.indexOf('border') > -1)) {
        if (decl.value.indexOf('#E4E6E9') > -1) {
          stylelint.utils.report({
            message: msgOutput('$common_color_lightBorder', 'border(-color)'),
            node: decl,
            result,
            ruleName
          })
          return
        } else if (decl.value.toUpperCase().indexOf('#B4BEC8') > -1) {
          stylelint.utils.report({
            message: msgOutput('$common_color_border', 'border(-color)'),
            node: decl,
            result,
            ruleName
          })
          return
        }
      }

      if (((decl.prop.indexOf('background') > -1) && (decl.value.indexOf('url(') > -1 && (decl.value.indexOf('images/independent') > -1)))) {
        stylelint.utils.report({
          message: msgOutput('$images_path', 'background(-image)'),
          node: decl,
          result,
          ruleName
        })
      }
    })
  }
}

rule.ruleName = ruleName
rule.messages = messages
module.exports = rule
