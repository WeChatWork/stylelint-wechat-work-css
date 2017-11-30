'use strict'

const test = require('ava')
const find = require('lodash.find')
const rule = require('./')

test('comments-in-header should exist', t => {
  t.truthy(find(rule, {ruleName: 'wechat-work/comments-in-header'}))
})

test('selector-namespace-follow-filename should exist', t => {
  t.truthy(find(rule, {ruleName: 'wechat-work/selector-namespace-follow-filename'}))
})

test('unused-mixins should exist', t => {
  t.truthy(find(rule, {ruleName: 'wechat-work/unused-mixins'}))
})

test('unused-nested-selector-namespace should exist', t => {
  t.truthy(find(rule, {ruleName: 'wechat-work/unused-nested-selector-namespace'}))
})
