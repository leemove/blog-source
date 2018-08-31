---
title: uncurrying
date: 2018-08-31 15:50:10
tags: JavaScript
---

# uncurrying

## 忍者の秘技

在我看的第二本Js相关的书`JavaScript忍者秘术`中,介绍了一种在js库中广泛使用的小技巧.常用的就是类数组借用数组的方法.

```js
(function () {
    Array.prototype.push.call(arguments, 4)
    console.log(arguments) // { '0': 1, '1': 2, '2': 3, '3': 4 }
})(1,2,3)
```

`arguments`是一个类数组对象,当我们想要让他调用数组的方法的时候,我们可以使用`Function.propt.call`,他可以修改当前函数运行时的this为第一个参数.

## 提取泛化过程

在上面的例子中,我们其实把一个属于数组的方法利用在了一个非数组对象中.我们把这个方法中的this规定的对象,泛化到了更广的适用性.我们可以使用uncurrying来解决把泛化的this提取出来的问题.

2011年,布兰登爱奇提出了这个概念,下面的代码就是uncurrying的实现方式之一.

```js
Function.prototype.uncurrying = function () {
    var self = this
    return function () {
        var obj = Array.prototype.shift.call(arguments)
        return self.apply(obj, arguments)
    }
}

var push = Array.prototype.push.uncurrying();

(function () {
    push( arguments, 4)
    console.log(arguments)
})(1,2,3)
```

我们抽离出来的push方法就跟Array.proto.push方法一样了,只不过第一个参数被绑定到了this上.

一些Js库中也会复制这些数组方法,做泛化处理.

```js
for ( var i = 0, fn, ary = [ 'push', 'shift', 'forEach' ]; fn = ary[ i++ ]; ){
Array[ fn ] = Array.prototype[ fn ].uncurrying();
};
```