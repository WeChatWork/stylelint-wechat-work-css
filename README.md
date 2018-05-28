# stylelint-wechat-work-css

[![Greenkeeper badge](https://badges.greenkeeper.io/WeChatWork/stylelint-wechat-work-css.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/WeChatWork/stylelint-wechat-work-css.svg?branch=master)](https://travis-ci.org/WeChatWork/stylelint-wechat-work-css)
[![npm version](https://badge.fury.io/js/stylelint-wechat-work-css.svg)](https://www.npmjs.com/package/stylelint-wechat-work-css)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Special stylelint rules for [WeChat at Work](https://work.weixin.qq.com) project css. [企业微信](https://work.weixin.qq.com)项目 Stylelint 自定义规则

## Install

```		
npm i stylelint-wechat-work-css -D
```


## Rules

- `comments-in-header`: SCSS 文件的文件头部必须要有注释,并包含 @date 跟 @author 的基本信息
- `selector-namespace-follow-filename`: 业务CSS 的命名空间需要跟随文件名
- `unused-mixins`: 因项目历史原因废弃不用的 minxins
- `unused-nested-selector-namespace`：子选择器不能使用特定命名空间的类名（本项目为`qui_xxx`）
- `declaration-use-variable`：一些声明使用Sass 变量

## Usege

Add `stylelint-wechat-work-css` to your stylelint config plugins array, then add rules you need to the rules object.

Example:

```
{
  'plugins': [
    'stylelint-wechat-work-css'
  ],
  'rules': {
    'wechat-work/unused-mixins':
      [
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
      ],
    'wechat-work/comments-in-header': true,
    'wechat-work/selector-namespace-follow-filename': [true, {
      'fileDirWhiteList': ['reg-word', 'ignore-filedir', 'mobile', '/^widget/', 'component'],
      'filenameWhitelist': ['/^reg-word/', 'ignore-filename']
    }
    ],
    'wechat-work/unused-nested-selector-namespace': true,
    'wechat-work/declaration-use-variable': true,
  }
}

```

## Contributing

Inspired from [stylelint-suitcss](https://github.com/suitcss/stylelint-suitcss).

Issues and Pull requests are welcome.
