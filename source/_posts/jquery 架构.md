---
title: JQuery源码阅读之整体架构
date: 2016-06-3 19:25:23
tags: javascript
---
#  JQuery 骨架
JQuery作为前端的基本功，每个前端都必然使用过，作为一个前端的初学者很好奇内部的源码。
今天开始将逐渐阅读一些JQuery源码，来解析他的设计思路，和一些小技巧，加深面向对象技能。
<!--more-->
# JQuery到底是方法还是对象
这个问题非常困扰我，JQuery既可以点出方法，明明是一个对象，可是又可以加个括号来当选择器，明明是一个方法。那么JQuery到底是什么。这里不得不说一个function都能做些什么？
## tips:function都有什么用法？
- 当做一个构造函数 用new调用
- 当做一个普通的方法 直接用()调用
- 当做一个对象 是一个不太普通的对象 继承Object

我好像懂了什么，JQuery应该是一个函数，只不过利用了函数也可以当做对象的特征而已，把方法都存在了他的原型中。那么可能是这样的。

首先要有一个JQuery方法，参数可以传入选择器，这里我们就只能根据TagName选择了，然后返回一个类数组对象。我们可以这么写。
```javascript
       function JQuery(selete) {
            return new JQuery.prototype.init(selete);
       }
       JQuery.prototype={
        //构造方法 生成对象用
            init: function (selete){
                var doms=document.getElementsByTagName(selete);
                //造一个类数组的结构
                for(var i=0;i<doms.length;i++){
                    this[i]=doms[i];
                }
                this.length=doms.length;
            },
            //我是JQuery内置的各种对象方法。
            method:function(){}
       };
```
# 怎么实现JQuery的全局方法和对象方法。
按照上面的例子分析，实现下来也非常的简单。
```javascript
 //    把init的实例都继承上JQuery原型上的方法，这样就可以了像Jquery一样，直接用Jquery对象来调用了。
       JQuery.prototype.init.prototype=JQuery.prototype;
       JQuery.fn=JQuery.prototype;
```
我们只要把init这个构造函数的原型指向JQuery的原型就可以了，这样就可以继承到JQuery中的方法。

全局方法呢，平时我们经常用*$.method*来调用的方法也不难实现了。可以直接把JQuery这个函数本身当做一个对象，就可以添加方法了。
```javascript
    $=JQuery;
    $.ajax=function(){
        console.log("我可能是一个假的方法")
    }
```
# 总结
以上代码算不上完美，但是没毛病。总结起来就是这样的
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <script>
        function JQuery(sel){
            return new JQuery.prototype.choose(sel);
        }
        JQuery.each= function (objs,callback){
            for(var i=0;i<objs.length;i++){
                callback.call(objs[i],i,objs[i]);
            }
        }
        JQuery.fn=JQuery.prototype = {
            choose: function (selete) {
                var divs=document.getElementsByTagName(selete);
                for(var i=0;i<divs.length;i++){
                    this[i]=divs[i];
                }
                this.length=divs.length;
            },
            each: function (callback){
                $.each(this,callback);
            }
        }
        JQuery.prototype.choose.prototype=JQuery.prototype;
        var $=JQuery;
        onload=function (){
            var adiv=$("div");
            console.log(adiv);
            ad.each(function (index,dom){
                this.innerHTML=index;
            })
        }
    </script>
</body>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
</html>
```
这里实现了一个JQuery的each方法，并且还原了JQuery大致的骨架。你对JQuery的思路有一个大致的了解了么。