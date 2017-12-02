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
    /**
    * test.scss
    * @author test
    * @date 2016-07-01
    */
    `
  }],

  reject: [{
    code:
      `
    /**
    * @date 2016-07-01
    */
    `,
    message: messages.rejected
  }, {
    code:
      `
    /**
    * test.scss
    * @date 2016-07-01
    */
    `,
    message: messages.rejected
  }, {
    code:
      `
    /**
    * test.scss
    */
    `,
    message: messages.rejected
  }, {
    code:
      `
    @charset "UTF-8";
    /**
    * test.scss
    * @author test
    */
    `,
    message: messages.rejected
  }]
})
