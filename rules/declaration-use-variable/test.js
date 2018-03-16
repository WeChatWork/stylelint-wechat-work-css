'use strict'

const testRule = require('stylelint-test-rule-ava')
const rule = require('./index')

const messages = rule.messages
const ruleName = rule.ruleName

testRule(rule, {
  ruleName,
  config: [true],
  skipBasicChecks: true,
  accept: [{
    code:
      `.gray {
    color: $common_color_gray;
  }
  .blue {
    color: $common_color_blue;
  }
    `
  }, {
    code:
      `.border {
    border: 1px solid $common_color_border;
  }
  .border2 {
    border-color: $common_color_border;
  }
    `
  }],

  reject: [{
    code:
      `.gray {
    color: #787878;
  }

    `,
    message: messages.rejected('$common_color_gray', 'color')
  }, {
    code:
      `.bgimg {
    background-image: url("../../images/independent/icons/File.png");
  }

    `,
    message: messages.rejected('$images_path', 'background(-image)')
  }, {
    code:
      `.border {
    border: 1px solid #E4E6E9;
  }

    `,
    message: messages.rejected('$common_color_lightBorder', 'border(-color)')
  }]

})
