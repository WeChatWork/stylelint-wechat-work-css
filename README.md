# stylelint-wechat-work-css

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

> Special stylelint rules for [WeChat for Work](https://work.weixin.qq.com) project css. 企业微信项目 Stylelint 自定义规则

> Notice: This plugin is still developing.



## Install

```		
npm i stylelint-wechat-work-css -D
```


## Rules

- `comments-in-header`: SCSS 文件的文件头部必须要有注释,并包含 @date 跟 @author 的基本信息
- `selector-namespace-follow-filename`: 业务CSS 的命名空间需要跟随文件名
- `unused-mixins`: 因项目历史原因废弃不用的 minxins
- `unused-nested-selector-namespace`：子选择器不能使用特定命名空间的类名（本项目为`qui_xxx`）


## Usege

```
"plugins": [
    "stylelint-wechat-work-css"
],
"rules": {
    "wechat-work/unused-mixins":
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
    "wechat-work/comments-in-header": true,
    "wechat-work/selector-namespace-follow-filename": true,
    "wechat-work/unused-nested-selector-namespace": true,
}

```

## Thanks

Inspired from [stylelint-suitcss](https://github.com/suitcss/stylelint-suitcss).
