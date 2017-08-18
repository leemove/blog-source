---
title: 4-18面试题总结
date: 2017-04-19 00:11:39
tags: rubbish
---
# 面试总结
4-18,4-17两天的面试题总结.包含了一些面试题,可能比较基础比较细节.
<!--more-->

## angular路由表示hash

angular中`$location`服务可以获取到当前地址栏的参数是基于`window.location`.通过这个服务我们可以获取并且监听当前的url,改变url.

当改变了地址栏,点击了后退按钮,或者点击了一个连接的时候就会触发.可以设置h5模式和普通模式.
## ng-if ng-show的区别
`ng-if`是决定是否去渲染这个元素,而`ng-show`是是否用css来让这个元素是否显示.

`ng-if`不会保留DOM的一些状态,并且会删除作用域.而`ng-show`会保留元素的一些状态.
## 解决ng-repeat重复内容报错

`ng-repeat`

1. 可以使用`item in items track by $index`很坑爹,竟然跪在了这一行代码
1. 可以把数据转换成引用类型,这样即使内容是一致的,因为地址是不相同的,所以不会报错.
## 自定义过滤器

比较简单,直接上代码了.
```js
app.filter('ifLogin', function () {
    return function (target) {
        if (target == "0") {
            return "在职";
        } else {
            return "离职";
        }

    }

});
```

## block，inline和inlinke-block细节对比
- display:block                                                                                                                             
  1. block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
  1. block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
  1. block元素可以设置margin和padding属性。
- display:inline
  1. inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
  1. inline元素设置width,height属性无效。
  1. inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。
- display:inline-block
  1. 简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。
## flex 布局
- 主轴justify-content
- align-items属性
    flex-start（默认值）：左对齐
    flex-end：右对齐
    center： 居中
    space-between：两端对齐，项目之间的间隔都相等。
    space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
# 一些我想说的话
来总结这些问题,其实是很痛苦的一件事啊,回忆自己被面试官吊打的经历...不过我估计这样痛苦的事情可能还要经历很多次...

面试可能并没有问那些高大上的JS原理问题,更多的是基于实战,问一些奇淫巧技,框架的使用等等.之前我一直认为框架这些东西,知道怎么去使用,就算使用错了,修改修改,查查文档能够写出合格优秀的产品才是唯一的目的.主要的学习方式应该是看看源码,熟悉底层的原理.现在看来要想过面试这关,主要还是考使用方面的问题比较多.





