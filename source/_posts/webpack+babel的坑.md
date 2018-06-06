---
title: babel中esmodule和commonjs模块化标准的坑
date:  2018-5-7 10:39:02  
categories: javascript angular
tags: 
---

# webpack封装sdk遇到的坑

>webpack这个工具,我只能说随缘了.
<!-- more -->

直接正题,坑是关于webpack+babel的

今天收到了新任务,要封装一个sdk,果断想起了webpack.万万没想到,踩了个坑,弄了一下午.

##复现

我要打包的js很简单

```js
export default {
    name: 123
}
```

webpackconfig.js如下
```js
const path = require('path');

module.exports =  () => (
    {
        mode: 'development',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'webpack-numbers.js',
            libraryTarget: 'umd',
            globalObject: 'this',
            // libraryExport: 'default',
            library: 'sdk'
        },
        externals: {
            'lodash': {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_'
            }
        }
    }
);
```

当我引入了打包之后的js,输出的竟然是这货.
```js
console.log(sdk)


{default: {…}, __esModule: true}
default:{name: 123}
__esModule:true
__proto__:Object
```
你是谁,麻烦走远点可以吗.

我想的引用name属性的方法应该是直接`sdk.name`,现在需要的是`sdk.default.name`什么鬼?

历经千辛万苦,大概7个小时的时间.在我添加并且配置了babel.
.babelrc如下
```js
{
  "presets": [
    "env"
  ],
  "plugins": [
    "add-module-exports"
  ]
}
```

终于能用了.关键点就在于`add-module-exports`这个插件.


这个插件干了一个什么事,就是在每一个模块后面加了一句
```js
module.exports = exports['default'];
```
那默认情况下,也就是
```js
module.exports = exports
```

我只能说一句,`坑爹`.webpack是真的玄学.

[babel作者的说明](https://blog.kentcdodds.com/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0)