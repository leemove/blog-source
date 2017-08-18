---
title: HTML5的进度条  
date:  2016-4-1 20:03:51  
categories: 
tags: 
---
# xxx-of-type(n)选择器
>一种迷之存在的选择器，真的有人会用这种选择器吗
<!--more-->

## E:first-of-type
选择兄弟元素中的第一个E类型的元素
`li:first-of-type`就是选择兄弟元素中第一个li元素
## E:last-of-type 
就是选择兄弟元素中最后一个E类型的元素
`li:last-of-type`就是选择兄弟元素中最后一个li元素
## E:nth-of-type(n)
就是选择兄弟元素中第n个E元素 和之前 nth-child(n)类似
`li:nth-of-type(5)` 选择兄弟元素中第五个li元素
## 代码示例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>$别看我$</title>
    <style>
        div li:first-of-type{
            color: red;
        }
        li:nth-of-type(2){
            color: yellow;
        }
    </style>
</head>
<body>
<div>
    <ul>
        <li>daf</li>
        <li>adsf</li>
        <li>adsf</li>
    </ul>
    <div>
        <li>adsf</li>
        <li>asdf</li>
        <li>asdfas</li>
    </div>
</div>
</body>
</html>
```