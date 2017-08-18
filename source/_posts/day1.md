---
title: 草稿  
date:  2016-3-21 20:41:02  
categories: rubbish
tags: 废稿 
---
# day1

没了好多，手滑删掉了

## 实例和data

实例会代理data

```javascript
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```

Vue实例中也暴露的一些方法，为了防止变量命名冲突，所有暴露的属性方法都用$开头

```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true

// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```

##  实例化的生命周期。

一个Vue在被实例化的过程为了方便管理，分成不同的周期，同时插入了回调函数。

```javascript

var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```

#  模板引擎

##  文本

可以使用最常见的语法```{{}}```双大括号，里面的值无论何时，只要绑定的值发生改变，他就会改变。

也可以使用v-once 指令，来设置插值，他的值不会随着改变。但是这样会影响一个节点的其他的数据绑定。//目前不知道影响在什么地方

## html代码

可以使用命令 v-html 来完成，但是要千万小心，小心XXS攻击。每个{{}}(绑定)中只能包含单个表达式，变量的声明，和流控制语句if都不会生效，要使用三元表达式。全局变量只能访问白名单中的变量，Math和Date等，不能使用用户自己的全局变量。

## 指令

- v-if 决定是否插入这个元素，根据绑定数据类型的布尔值来判断。

### 含参数的指令

有的指令需要配合参数来使用比如

- ```v-bind:href="url"```把标签的href属性绑定到数据url上。

- ```v-on:click="do"```这里的do是函数，会在元素click事件触发时候被调用。

### 修饰符
- ```<form v-on:submit.prevent="onSubmit"></form>```修饰符在参数之后，.prevent表示对阻止事件的默认行为。
### 过滤器
Vue允许自定义过滤器，可以操作一些文本。用跟在管道符后面，过滤器可以用在v-bind中或者胡子中。
过滤器也可以接受参数，但是第一个参数被设定为管道符之前的文本数据，在调用时传入的参数将会作为第二个参数开始，过滤器也可以进行嵌套。
过滤器在app中使用filters属性定义。
```html
    <div id="app" >
   <span >{{ message | capUp}}</span>
    </div>

    <script src="vue.js"></script>
    <script>
        var vm=new Vue({
            el:'#app',
            data:{
                message:"hello"
            },
            filters:{
                capUp: function (value) {
                    value=value.toString();
                    var str=value.charAt(0).toUpperCase()+value.slice(1);
                    console.dir(str);
                    return str;
                }
            }
        });
    </script>
```
### 缩写
为了简化使用，将最常用的两个命令v-bind和v-on设置了简写
```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```
# 计算属性
有的属性需要很复杂的操作才能写入网页，当这些逻辑都写在模板引擎中的时候，会变得非常难以维护，所以抽离除了属性计算这个功能。
计算函数声明在computed属性中，在模板引擎中可以当做字符串调用，并且如果依赖其他的数据，在其他的数据更新的时候，这个数据也会被更新。
```html
    <div id="app" >
   <span >{{ message }}</span>
   <h3>{{  remessage}}</h3>
   <input type="text" v-model="message"   name="" value="">
    </div>

    <script src="vue.js"></script>
    <script>
        var vm=new Vue({
            el:'#app',
            data:{
                message:"我为什么总要被反过来"
            },
            computed:{
                remessage: function () {
                  return  this.message.split("").reverse().join("");
                }
            }
        });
    </script>
```
这个功能会实现到修改文本框的内容时，正序倒叙的内容都改变。
## 计算属性的缓存
计算属性是存在缓存机制的，并不是每一次重新渲染都要执行计算缓存的函数，当依赖的数据没有发生改变的时候，是不会执行这个函数的。
## 计算属性的 get 和set
计算属性平时默认只有get，但是也可以设置set
```javascript
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```
当执行vm.fullname="'时set函数将会被调用，那两个值也将会被更新。
## 观察者watcher
watcher也能观察到数据的改动，但是相比于计算属性，更适合执行异步操作，或者开销较大的操作。