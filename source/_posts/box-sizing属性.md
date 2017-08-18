---
title: HTML5的进度条  
date:  2016-4-1 20:03:51  
categories: 
tags: 
---
# C3box-sizing属性
> 这个属性只有两个值，分别是border-box,content-box;
<!--more-->
##  属性值的介绍
* border-box属性是指，给当前盒子设定的宽度高度包括了Border 也就是如果宽度设置为50px，有1bpx的border那么会将盒子的宽度改成48px。类似border属性的还有padding属性。都不会将盒子撑大。
* content-box 默认值，也就是给当前盒子设置的宽高对应的是内容的宽高。
##用border-sizing属性来修改简易日历。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    ul {
      list-style: none;
      margin: 100px auto;
      padding: 0;
      width: 420px;
      background-color: hotpink;
      overflow: hidden;
    }
    
    li {
      width: 60px;
      height: 60px;
      /*border: 1px solid gray;*/
      border-top:1px solid gray;
      border-left: 1px solid gray;
      float: left;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      font-family: "微软雅黑";

      /* 设置盒子模型属性
          保证 元素 自身的尺寸 不变 
          通过压缩内容来实现
       */
      box-sizing: border-box;
    }

    li:nth-child(7n){
      border-right: 1px solid gray;
    }
    li:nth-child(n+22){
      border-bottom: 1px solid gray;
    }
    li:nth-child(n+29){
      border-top:none;
    }
    li:nth-last-child(1){
      border-right: 1px solid gray;
      width: 61px;
    }
   
  </style>
</head>

<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>20</li>
    <li>21</li>
    <li>22</li>
    <li>23</li>
    <li>24</li>
    <li>25</li>
    <li>26</li>
    <li>27</li>
    <li>28</li>
    <li>29</li>
    <li>30</li>
    <li>31</li>
  </ul>
</body>

</html>
```
