---
title: 草稿  
date:  2016-3-21 20:41:02  
categories: rubbish
tags: 废稿 
---

# Class与Style绑定

## 绑定HTML Class
### 对象语法
使用```v-bind:class```来绑定class，不会和html本身的class属性冲突。

还可以用增强式的写法```v-bind:class="{height:ischeck}"```会根据ischeck的布尔属性，来判断是否添加height。
```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```
数据如下
```javascript
data: {
  isActive: true,
  hasError: false
}
```
会被渲染成
```html
<div class="static active"></div>
```
当data里的两个属性发生变化的时候，页面也会刷新。

也可以直接把绑定的这个对象直接写在data中
```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
所以我们也可以绑定到计算属性返回的对象。
### 数组语法
可以绑定对象，那么也可以绑定类似的数组
```html
<div v-bind:class="[activeClass, errorClass]">
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
会被渲染成
```html
<div class="active text-danger"></div>
```
### 在组件上使用
组件上类似于html的普通类样式，和绑定的数据时共存的，不会产生冲突。
## 内联样式的绑定
当使用一些CSS的新特性的时候，插件会自动添加前缀！
### 对象的写法
可以使用对象的写法，CSS内部可以使用驼峰命名法或者-连接 短横分隔命名。

建议直接绑定到一个对象中
```html
<div v-bind:style="styleObject"></div>
```
```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```
### 数组语法
也可以使用数组语法，数组中的每一个变量都是一个对象。
# 条件渲染
## v-if
v-if在之前已经介绍过。

v-if也可以在<template>中使用

配合v-if的还有v-else和v-else-if 不进行详尽的介绍了
##key
key可以管理可复用元素的渲染。
```html
    <div id="app">
        <template v-if="loginType === 'username'">
            <label>Username</label>
            <input placeholder="Enter your username">
        </template>
        <template v-else>
            <label>Email</label>
            <input placeholder="Enter your email address">
        </template>
        <input type="button" :value="loginType" @click='change'>
    </div>
    <script src="../vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                loginType:'username'
            },
            methods:{
                change: function (){
                    if(vm.loginType=='username'){
                        vm.loginType='email';
                    console.log(this.loginType)                        
                }else{
                    vm.loginType='username'
                }
                
            }
        }})
    </script>
```
如果点击按钮切换模板的时候，input中的内容不会被修改，是因为vue认为这两个输入框内容是一致的 只是会修改他的placeholder。这时可以用自定义属性key来区分
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
## v-show  
决定一个元素是否被显示，修改的是display元素。v-if是惰性的，只有在条件被改变的时候，才会重新渲染，而v-show是每次都会被渲染.

v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下， v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。
# 列表渲染v-for
大部分功能和v-if类似。可以便利数组，遍历对象。另外还有
## 整数迭代
```html
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```
渲染的结果是从0到10
## 组件和v-for
v-for　可以在组件中使用，因为组件有一套自己的作用域，当调用vm中的数据时，是不可以直接获取到的，可以配合Props来传递数据。
## key
和v-if一样,v-for也有类似的缓存机制，当渲染已经存在的元素时，如果数据项的顺序被改变，Vue是不会移动dom元素来进行匹配的，也可以用:key来设置每次循环的key，理想情况下每个key都不一致。比如可以如下设置
```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```
## 变异方法
因为直接操作数组的时候，数组的内存地址并没有改变，不会触发geter和seter所以无法检测。为了检测到Vue提供了以下的编译方法。
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
  这些方法会修改数组，从而导致重新渲染
  filter(), concat(), slice() 这些方法虽然返回数组，但是不会修改原数组。

当用一个新数组替换原数组的时候，并不是丢弃当前的dom元素重新渲染，而是采用了内部优化手段。
## 注意
当使用下面这种修改方式的时候，不会触发页面的渲染
```vm.items[indexOfItem] = newValue```

```vm.items.length = newLength```

为了提供这种修改的方式Vue提供了下面的方法
- ```Vue.set(example1.items, indexOfItem, newValue)```
- ```example1.items.splice(indexOfItem, 1, newValue)```
- 修改.lenght可以用```example1.items.splice(newLength)```

##  v-for 配合计算属性或者方法
v-for 可以配合计算属性或者方法来使用，用来进行排序，过滤等等操作。
# 事件处理器
## 监听事件
可以用v-on来监听dom元素的事件，函数体可以直接写在冒号里，this.可以省略，可以传入参数$event代表传入实践对象。
## 事件修饰符
加在事件名type的后面
- .stop 阻止事件冒泡
- .prevent 阻止事件的默认事件
- .capture 使用事件捕获模式
- .self 只有事件源头是这个元素本身，才会触发
- .once 只触发一次
## 按键修饰符
可以给按键事件绑定的修饰符，```<input v-on:keyup.13="submit">```只有在键值是13的时候才会触发submit。

Vue预设了一些常用的键值，可以直接调用，存在Vue.config.keyCodes.下

- .enter
- .tab
- .delete (捕获 “删除” 和 “退格” 键)
- .esc
- .space
- .up
- .down
- .left
- .right
- .ctrl
- .alt
- .shift
- .meta- 
  meta媒体按键，在不同的系统中可能是不同的按键。windows下可能是win
#表单控件绑定
很多表单，感觉没必要挨个说，v-model可以绑定一个控件的value到一个数据上。
## 修饰符
- .lazy 只有在值发生改变的时候触发，而不是每次按键触发。
- .number 会将value转换成数字
- .trim 可以去掉两侧的空格
# 组件
> 组件是Vue最强大的功能
## 注册
注册组件要使用Vue.component函数，第一个参数的组件的标签名，第二个参数是一个对象，对象里包含props,template等属性。

自定义标签最好符合W3C标准，也就是小写加-
```html
<div id="example">
  <my-component></my-component>
</div>
```
```javascript
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
// 创建根实例
new Vue({
  el: '#example'
})
```

## 局部注册

当不需要在全局范围内注册组建时，可以在一个Vue实例化的参数中声明。

```javascript
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```

## DOM模板解析

当你的自定义组建在一些标签内使用时，可能受到限制，因为Vue只能在浏览器按照标准化解析之后才能操作DOM，但是一些标签ul,ol等存在着限制，所以可以用Is标签来定义组件。

```html

```

## data必须是函数

组件中的data必须是一个函数，这种方式的目的是，通过函数的局部变量，来个每个实例一个属性。

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```

```javascript
var data = { counter: 0 }

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象
  data: function () {
    return data
  }
})

new Vue({
  el: '#example-2'
})
```

data函数的返回值将作为data来存储。

## 自定义属性和驼峰命名

因为HTML对大小写是不敏感的，所以在html中要用小写字母-符号连接的方式。

## 动态props

```javascript
    <div id="app">
        <div>
            <input v-model="parentMsg">
            <br>
            <child v-bind:my-message="parentMsg"></child>
        </div>
    </div>
    <script src="../vue.js">

    </script>
    <script>
        Vue.component('child', {
            // camelCase in JavaScript
            props: ['myMessage'],
            template:'<span>{{ myMessage }}</span>',
            data:function(){
                return {
                    // myMessage:"hahahah"                    
                }
            }
        })
        var app = new Vue({
            el: "#app",
            data:{
                parentMsg:"hahahah"
            }
        })
    </script>  
```

组件的模板必须渲染一个标签，这里将parentMsg绑定到了子组件的props上。实现了关联。

同时注意子组件定义的自定义属性上使用了v-bind，不然只是复制了一个字面量的值。