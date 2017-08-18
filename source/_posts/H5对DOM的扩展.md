---
title: HTML5新增的DOM扩展  
date:  2016-4-1 20:03:51  
categories: 
tags: 
---
# H5对DOM的扩展
<!--more-->

## 新增的选择器方法

 ###querySelector()在括号内可以填写CSS选择器 类似于Jquery 但是只会匹配第一个对应的元素

### querySelectorAll()同上 但是会选择到所有匹配的元素 (没有隐式迭代)
```javascript
  document.querySelector( 'li').style.backgroundColor = 'yellowgreen';
  document.querySelector('.hot').style.backgroundColor = 'red';
  document.querySelector('#eggWithmeat').style.backgroundColor = 'brown';
```
## 增加的类名操作方法
>dom中原来的类操作方法只有一个参数是className 可以进行简单的操作 是一个字符串
### H5的类样属性为classList 是一个包装对象 类似于数组 但是有自己的方法
* value 属性是和原来的className类似  数组的每个索引对应一个类名 length属性对应类的个数
* obj.classList.add（） 添加类样式的方法 $中addClass
* obj.classList.remove() 删除类样式的方法 $中removeClass
* obj.classList.contains()检测是否有这个类样式 $中hasClass
* obj.classList.toggle() 如果没有就添加 有就删除 $中toggleClass
## 自定义属性
* 在HTML 属性中 可以添加自定义属性 必须用data-进行开头
* 在DOM中访问时 需要用 `对象.dataset.属性名`或者`对象.dataset["属性名"]`进行访问 