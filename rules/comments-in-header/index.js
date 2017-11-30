'use strict';

const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const msgPrefix = require('../../utils/messagePrefix');
const ruleName = namespace('comments-in-header');
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: msgPrefix.main + "Comments with info like '@author' '@date' should be existed in file header.",
});

// 验证头部注释是否有 @author 或 @data 这些关键词
function vaildComment(comment) {
  if ((typeof comment === 'string') && (comment.indexOf('@author') > -1) && (comment.indexOf('@date') > -1)) {
    return true;
  }
  return false;
}

function rule(actual) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual});
    if (!validOptions) {
      return;
    }

    // console.log(root.index(root.first),root.first.toString())

    // 注释肯定是在第一或第二个代码段位置,
    // 换而言之，第一个肯定是 @charset "UTF-8"; 或者注释
    if (root.first.type === 'atrule' && root.first.name === 'charset') {
      // 当第一个节点为 @charset "UTF-8"; 的时候，第二个节点应该为文件注释头
      if (root.nodes[1].type === 'comment') {
        let targetComment = root.nodes[1].toString();
        // console.log(targetComment,vaildComment(targetComment))
        if (vaildComment(targetComment)) {
          return;
        }
      }
    } else {
      if (root.first.type === 'comment') {
        let targetComment = root.first.toString();
        // console.log(targetComment)
        if (vaildComment(targetComment)) {
          return;
        }
      }
    }

    stylelint.utils.report({
      message: messages.rejected,
      node: root,
      result,
      ruleName,
    });

  };
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
