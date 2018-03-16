'use strict'

const testRule = require('stylelint-test-rule-ava')
const rule = require('./index')

const messages = rule.messages
const ruleName = rule.ruleName

testRule(rule, {
  ruleName,
  config: [true],
  // skipBasicChecks: true,
  accept: [{
    code:
      `
    .gray {
    color: $common_color_gray;
  }
  .blue {
    color: $common_color_blue;
  }
    `
  }, {
    code:
      `
     .border {
    border: 1px solid $common_color_border;
  }
  .border2 {
    border-color: $common_color_border;
  }
    `
  }],

  reject: [{
    code:
      `
    .gray {
    color: #787878;
  }
  .blue {
    color: #38689F;
  }
  .red {
    color: #F05A5A;
  }
    `,
    message: messages.rejected
  }, {
    code:
      `
    .bgimg {
    background-image: url("../../images/independent/icons/File.png");
  }
  .bgimg2 {
    background: url("../../images/independent/icons/File.png") no-repeat top center;
  }
    `,
    message: messages.rejected
  }, {
    code:
      `
   .border {
    border: 1px solid #E4E6E9;
  }
  .border2 {
    border-color: #E4E6E9;
  }
  .border3 {
    border: 2px solid #B4BEC8;
  }
  .border4 {
    border-color: #B4BEC8;
  }
    `,
    message: messages.rejected
  }]

})
