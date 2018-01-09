---
title: 一起读读Vue(1)
date: 2017-12-23 15:50:10
tags: Vue
---
# 起点

Vue是一个流行的Js框架,和Google的`Angular`,FaceBook的`React`相类似.Vue在2016年得到了爆发式增长.写这篇博客时,npm对他的下载量统计.
![TIM20171223155444.png](https://tuchuang001.com/images/2017/12/23/TIM20171223155444.png)

作为一个长期使用Vue框架的开发者,Vue的API设计和灵活性在开发中会让你感觉十分顺畅,解决一些常见的问题时变得不那么复杂.如果你有过使用Vue的经验,我相信你也会对他赞不绝口.

好吧,话不多说,开始源码吧!

> 如果你跟我一样有一点js,dom基础,我相信读起来不会太吃力.

<!-- more -->

## 目录结构

首先从github 上下载了`2.5.2`版本的代码,目录结构如下,我们大致可以看出一些目录的含义.

``` bash

├─dist # 打包后的文件目录
├─src # 源码目录 也就是我们最关心的文件夹
│  ├─compiler # 编译相关?
│  │  ├─codegen
│  │  ├─directives
│  │  └─parser
│  ├─core # 核心相关
│  │  ├─components # 组件
│  │  ├─global-api # 全局api
│  │  ├─instance   # 实例
│  │  │  └─render-helpers
│  │  ├─observer  # 观察者, 实现双向绑定的关键
│  │  ├─util # 工具
│  │  └─vdom # 大名鼎鼎的虚拟dom
│  │      ├─helpers
│  │      └─modules
│  ├─platforms # 平台
│  │  ├─web # web平台 也就是我们的入口文件夹
│  │  │  ├─compiler # 编译
│  │  │  │  ├─directives
│  │  │  │  └─modules
│  │  │  ├─runtime
│  │  │  │  ├─components
│  │  │  │  ├─directives
│  │  │  │  └─modules
│  │  │  ├─server
│  │  │  │  ├─directives
│  │  │  │  └─modules
│  │  │  └─util
│  │  └─weex # week平台
│  │      ├─compiler
│  │      │  ├─directives
│  │      │  └─modules
│  │      ├─runtime
│  │      │  ├─components
│  │      │  ├─directives
│  │      │  └─modules
│  │      └─util
│  ├─server # 服务端渲染?
│  │  ├─bundle-renderer
│  │  ├─optimizing-compiler
│  │  ├─template-renderer
│  │  └─webpack-plugin
│  ├─sfc
│  └─shared
└─types

```

目前大部分应用都在web平台,那我们就先看看web目录吧.打开`index.js`.

> 因为Vue是使用flow这个js类型检测工具所书写的,所以变量方法后面都会有类型声明
```js
/* @flow */

// #加载各种配置
// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// 定义$mount方法
// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// # 处理浏览器插件的支持
// devtools global hook
/* istanbul ignore next */
Vue.nextTick(() => {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue)
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      )
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      `You are running Vue in development mode.\n` +
      `Make sure to turn on production mode when deploying for production.\n` +
      `See more tips at https://vuejs.org/guide/deployment.html`
    )
  }
}, 0)

export default Vue
```

这个文件主要分成三部分:

1. 第一段加载了许多不知名的文件和配置,没有一个熟脸.
1. 声明方法,`$mount`方法我们还是很熟的.
1. 插件支持

```js
Vue.prototype.$mount = function (
  el?: string | Element, // 选择器
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

原来每次挂载都调用了`mountComponent`,我们有必要看一下这个nb的函数.他的位置在`core/instance/lifecycle.js`,看起来应该是生命周期的文件.