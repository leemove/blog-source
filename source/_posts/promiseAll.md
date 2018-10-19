---
title: promiseAll
date: 2018-10-19 17:18:09
tags: koa **nodejs**
---

# 并行异步

![banner](https://s3-us-west-1.amazonaws.com/www.jcolemorrison.com/blog/posts/1-20-2018-async-await/async-await.png)

异步非阻塞UI是NodeJs的最强大之处,但是不少JS使用者都没有真正的在业务中做到把异步融会贯通,在不少的项目中,都会有一些应用不当的情况.本文讲解了一种最常见的问题,希望大家能用到.

<!-- more -->

## 场景还原

比如在页面初始化时,我们经常要初始化各种数据,以下就是一个典型的场景.

```js

async created () {
    await this.getBread();
    await this.getMilk();
}

```

在这段代码中我们有两个异步操作,都被await标记`await`:

    1. 获取面包
    2. 获取牛奶

这两个任务的执行顺序是先执行1,再执行2.

[![-1.fwa295a.png](https://www.tuchuang001.com/images/2018/10/19/-1.fwa295a.png)](https://www.tuchuang001.com/image/5xdOs)

这两个任务其实之间并没有什么依赖关系,可以认为是相互独立的.那我们为啥不一起做呢?

```js
async created () {
    await Promise.all([this.getBread(), this.getMild()])
}
```

[![-2.fw.png](https://www.tuchuang001.com/images/2018/10/19/-2.fw.png)](https://www.tuchuang001.com/image/5xyf7)

依靠`Promise.all`我们很简单就得就可以一边等牛奶,一边等面包了,这样我们就节省了2s.

这是很多新手容易犯的一个错误.这个例子中虽然很简单,但是结合一些复杂的业务代码,会让问题很难被发现.

## koa中间件和异步处理

在web后台中,我们经常要处理比前端更复杂的异步逻辑.比如会有以下的代码.

```js

app.use((ctx, next) => {
    await bread.save()
    await next()
})

app.use((ctx, next) => {
    await milk.save()
    await next()
})
```

在这段koa代码中,我们分别注册了两个中间件,第一个中间件处理面包,第二个中间件处理牛奶.这段代码仍然是要操作完牛仔,再操作面包.我们可以修改成下面这样.

```js
app.use((ctx, next) => {
    await Promise.all(bread.save(), next())
})

app.use((ctx, next) => {
    await milk.save()
    await next()
})
```

koa中实际上就是下面所有要执行中间件封装的一个promise,这里详细的可以看`koa-compose`源码,这样就可以并行的处理牛奶和面包了.达到最快的效率.

## 总结

本文介绍的方法虽然很简单,但是我仍然在不少js熟练使用者的代码中,发现这样的小问题.

异步的处理仍然是不少js初学者似懂非懂的部分,异步也是js最重要的特性,如果要真的弄懂异步,推荐从事件回调,Promise,async-await都要仔细的了解一下其中的奥妙.再配合事件循环等等js的运行逻辑,相信大家都会对异步的理解更上一层楼.Bye.