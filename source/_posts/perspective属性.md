---
title: perspective属性  
date:  2016-4-8 20:41:02  
categories: CSS3
tags: 
---
# perspective的介绍
## perspective属性
* 这个属性的值会改变一部分变换的效果，单独使用没有明显的效果。
* 这个属性可以理解为 设置属性的元素距离z=0也就是距离屏幕的距离，单位可以是px。正方向是屏幕的内侧，负方向是屏幕的外侧人的方向。
* 对要进行动画元素的父元素使用，如果效果不正常那么在对其父元素的父元素使用。当具有这个属性的值，发生动画效果的时候，有时会产生近大远小的效果。
<!--more-->
## 开门大吉案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>$想不想知道后面写的是什么$</title>
    <style>
        div{
            width: 300px;
            height: 400px;
            margin: 50px auto;
            border: 1px solid black;
            perspective: 1000px;
            /*到屏幕的距离 正数是屏幕内*/
        }
        div:before{
            content:"";
            width: 50%;
            height: 100%;
            float: left;
            background: url("https://www.tuchuang001.com/images/2017/01/30/door.jpg");
            transform-origin: left center;
            transition: all 1s;
        }
        div:after{
            box-sizing: border-box;
            content: '';
            width: 50%;
            height: 100%;
            float: right;
            background: url("https://www.tuchuang001.com/images/2017/01/30/door.jpg");
            border-left: 1px dashed black;
            /*设定发生变换的中心点 左右两个门分别赌赢左右轴*/
            transform-origin: right center;
            transition: all 1s;

        }
        div:hover:before{
            transform: rotateY(-140deg);
        }
        div:hover:after{
            transform: rotateY(140deg);

        }
    </style>
</head>
<body>
<div></div>
</body>
</html>
```
结果如下:</br>
[![opendoor.gif](https://www.tuchuang001.com/images/2017/01/30/opendoor.gif)](https://www.tuchuang001.com/image/H2zuE)

