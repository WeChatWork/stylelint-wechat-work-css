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
    @charset "UTF-8";
    /**
    * test.scss
    * @author test
    * @date 2016-07-01
    */
    `
  }, {
    code:
      `
    .a {
      .b {}
    }
    `
  }, {
    code:
      `
    .qui {
      font-size: 15px;
    }
    `
  }],

  reject: [{
    code:
      `
    .a {
      .b {}
      .qui_dialog {
      font-size: 12px;
      }
    }
    `,
    message: messages.rejected,
  }, {
    code:
      `
    .a {
      .qui_btn {
        font-size: 12px;
      }
    }
    `,
    message: messages.rejected,
  }, {
    code:
      `
    .a {
      .qui_btn {
        font-size: 12px;
      }
    }
    `,
    message: messages.rejected,
  }, {
    code:
      `
    .a {
      .b .qui_btn {
        font-size: 12px;
      }
    }
    `,
    message: messages.rejected,
  }],
})
