'use strict'

const testRule = require('stylelint-test-rule-ava')
const rule = require('./index')

const messages = rule.messages
const ruleName = rule.ruleName

testRule(rule, {
  ruleName,
  config: [[
    '/^transition/',
    '/^transform/',
    '/^translate/',
    '/^scale/',
    '/^rotate/',
    '/^animation/',
    'box-sizing',
    'box_sizing',
    'inlineBlock',
    'box-shadow',
    'box_shadow',
    'opacity',
    'keyframes'
  ]],
  skipBasicChecks: true,
  accept: [{
    code:
      `
    .a {
      box-sizing: content-box;
    }
    `
  }, {
    code:
      `
    .b {
      transition: all 0.5s ease-in;
    }
    `
  }],

  reject: [{
    code:
      `
    .a {
      @include box-sizing(content-box);
    }
    `,
    // message: messages.rejected,
  },

    {
      code:
        `
    .b {
      @include transition(all 0.5s ease-in);
    }
    `,
      // message: messages.rejected,
    }, {
      code:
        `
    .c {
      box-sizing: content-box;
      @include transition(all 0.5s ease-in);
    }
    `,
      // message: messages.rejected,
    }, {
      code:
        `
    .d {
      box-sizing: content-box;
      @include scale(1);
    }
    `,
      // message: messages.rejected,
    }

  ],
})
