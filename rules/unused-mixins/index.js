'use strict';


// 参考 https://github.com/stylelint/stylelint/blob/f6fbad37e1ffa84aed4a996b3829b4275e7320c5/lib/rules/at-rule-blacklist/index.js
const _ = require("lodash");
const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const msgPrefix = require('../../utils/messagePrefix');
const ruleName = namespace('unused-mixins');
const validateOptions = require("../../utils/validateOptions");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const postcss = require("postcss");
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (mixinName) => `[qmui] Not suggest to use "${mixinName}" mixin in project, please use native grammar instead.`,
});

// mixins 黑名单
// const blacklistInput = ['transition', 'box-sizing', 'box_sizing', 'inlineBlock', 'box-shadow', 'box_shadow', 'opacity', 'transform', 'animation', 'keyframes', 'translate']

function rule(blacklist) {
  // console.log("rule-value",blacklist)
  return (root, result) => {
    // const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual});
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: blacklist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(atRule => {
      const name = atRule.name;
      const atRuleParams = atRule.params;

      // 排除非 @include
      if (name !== 'include') {
        return;
      }

      // 从 param 中获取到 mixin 的名字
      // 下面的正则表达式有 bug
      // const mixinName = atRuleParams.replace(/(\s*?)\((?:\s|\S)*\)/g, "");
      const mixinNameBefore = atRuleParams.indexOf('(') > -1 ? atRuleParams.split('(')[0] : atRuleParams;
      const mixinName = mixinNameBefore.trim();
      // console.log(mixinName.trim())
      // const blacklist = blacklistInput.join('|');

      /*
      // 需要特殊处理类似 transition-duration 这类 mixins
      if (mixinName.indexOf('transition-') > -1 ||
        mixinName.indexOf('scale') > -1 ||
        mixinName.indexOf('translate') > -1 ||
        mixinName.indexOf('rotate') > -1 ||
        mixinName.indexOf('transform') > -1
      ) {
        // 证明不行
      } else {
        if (blacklist.indexOf(mixinName) <= -1) {
          return;
        }
      }
      */

      if (!matchesStringOrRegExp(postcss.vendor.unprefixed(mixinName), blacklist)) {
        return;
      }

      stylelint.utils.report({
        ruleName,
        result,
        node: atRule,
        message: messages.rejected(mixinName),
      })

      // console.log()
    });
  };
}
rule.primaryOptionArray = true;
rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
