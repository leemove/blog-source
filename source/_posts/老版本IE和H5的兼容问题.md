---
title: HTML5的兼容性  
date:  2016-4-1 20:03:51  
categories: 
tags: 
---
#  老版本IE和H5的兼容问题
<!--more-->
>   IE8是前端开发不可忽视的兼容性问题
*   如何在不支持H5的IE8中使用新标签  DOM方法为例
    *  首先创建一个元素` var ele=document.createElement("");`
    *  设置元素的样式 ` ele.style.display="block"; `
    *  把元素添加到页面中 ` body.appendChild(ele); `
```javascript
var header=document.createElement("header");
    header.style.display="block";
    document.body.appendChild(header);
```
*  可以使用别人封装好的库 来在页面中直接使用H5新标签
```javascript
  <script src='js/html5shiv.min.js'></script>
```
* IE8的兼容写法
  * 使用编译器的快速写法 CC:IE6	然后tab展开 在两行的中间添加代码，这样只有在低于或等于你填写的版本时 这段代码才会执行
```javascript
	<!--[if lte IE 6]>
<script >
    console.log("你的浏览器太LOW 赶快升级吧");
</script>
<![endif]-->
```