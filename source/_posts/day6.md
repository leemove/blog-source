---
title: 草稿  
date:  2016-3-21 20:41:02  
categories: rubbish
tags: 废稿 
---

#  起步

实例化一个最简单的app

```javascript
     var app=new Vue({
            el:"#app",
            data:{
                message:"Helloe Vue!"+new Date(),
                lorem:'nihenpi'
            }
        })
```

el 代表选择器，把app制定到具体的dom元素，data代表数据，通常使用在模板引擎等位置。

#  V指令

在一个标签内部定义一个自定义属性以v:开头，代表Vue指令。这个指令通常要对这个元素进行操作。

## v-bind

绑定操作，绑定元素的属性比如```v-bind:title="message"```  绑定这个元素的title属性，绑定到app内部的message数据。

## v-if

表示可视性，根据绑定数据的布尔值来判断当前元素是否显示。

```html
    <div id="app">
        <span  v-if="seen">
            {{ lorem}}
            </span>
    </div>
    <script>
        var app=new Vue({
            el:"#app",
            data:{
                seen:true,
                lorem:"我要隐藏了"
            }
        })
    </script>
```



当你在控制台输入```app.seen=false```的时候这个span会被隐藏。

## v-for

用于模板引擎，类似每次都会循环标签内的模板引擎进行输出

```html
    <div id="app">
        <span  v-for="todo in TODOList">
            {{ todo }}
            </span>
    </div>
    <script>
        var app=new Vue({
            el:"#app",
            data:{
                TODOList:["hahahah","hehehehehe","hohohohoho"]
            }
        })
    </script>
```

网页上将会显示数组中的内容hahahah hehehehehe hohohohoho。

##  v-on事件监听

可以给对应的元素设置事件，配合数据的绑定使用非常厉害。

```html
 <div id="app">
        <span> 
           {{message}}
       </span>
        <input type="button" name="" value="一发逆转！" v-on:click="resever">
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                message: "我真是日了狗了"
            },
            methods: {
                resever: function () {
                    this.message=this.message.split('').reverse().join("");
                }
            }

        })
    </script>
```

这样当点击按钮的时候，span标签内的文字也会跟着改变。

## v-model

可以给表单设置，把表单的value和数据进行绑定

```html
    <div id="app">
        <span> 
           {{message}}
       </span>
       </br>
        <input type="text" name="" v-model="message">
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                message: "我真是日了狗了"
            }
        })
    </script>
```

