---
title: 草稿  
date:  2016-3-21 20:41:02  
categories: rubbish
tags: 废稿 
---

# 组件

## props

### 单向数据流

上例中的数据传递，只能是从外到内，而不能从内到外，是单项的。内部不可以对数据进行修改。

一般我们修改子组件中的props数据，多半是因为

- prop 作为初始值传入后，子组件想把它当作局部数据来用；

- prop 作为初始值传入，由子组件处理成其它数据输出

1. 解决这个两个问题要用到不同的方式。
   可以使用一个局部变量，来保存这个属性，操作时访问这个局部变量。
```javascript
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
2. 可以使用计算属性，处理porps值
```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
注意当props是一个引用类型的时候，
## props验证
当你的组件给第三个人使用的时候，可能就需要Props的验证了，判断传入的数据是否符合规格。
这是props不再时一个数组了，需要是一个对象。
```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
##　自定义事件
我们已经知道了父组件可以使用props来给子组件传递数据，那么子组件怎么传递数据给父组件呢，就要用到自定义事件。
Vue实现了事件接口 $on(type)监听事件，$emit()触发事件
虽然和addeventlistern类似，但是是有区别的。
$on不能监听到子组件抛出的事件，需要用v-on
```html
<div id="app">
        {{counter}}
        <br>
        <child  v-on:count="couterTotal"> </child>
        <child  v-on:count="couterTotal"> </child>
        <child  v-on:count="couterTotal"> </child>
    </div>
    <script src="../vue.js">

    </script>
    <script>
        Vue.component('child', {
            template:'<button v-on:click="count">{{ counter }}</button>',
            data:function(){
                return {
                    counter : 0
                }
            },
            methods:{
                count: function (){
                    this.counter ++;
                    this.$emit('count');
                }
            }
        })
        var app = new Vue({
            el: "#app",
            methods:{
                couterTotal:function (){
                    this.counter++;
                }
            },
            data:{
                counter:0
            }
        })
    </script>
```
在这里，其实这两者之间的关系是已经完全解耦的，内外部有隔断的。
## solt分发内容
我们在使用组件的时候，可能会嵌套配合使用。
```html
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```
组件可能有自己的模板，而父组件和子组件的模板就产生了冲突，这时候就产生了solt分发内容。
## 编译作用域
组件内部的作用域是该组件，组件标签上的内容作用域是父组件，
## 单个solt
在子组件中可以定义solt标签，标签内的内容都是备用的内容，当嵌套到其他组件时，该部分内容会被覆盖。
假设my-componnet组件中定义如下模板
```html
<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```
父组件的模板如下
```html
<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>
```
渲染的结果将会是
```html
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>
```
## 具名slot
具名就是有名字，hasname。可以在子模板，父模板中同时定义slot标签，然后通过name的对应关系来指定渲染的位置。当slot标签没有name时候，默认会把父元素中没有找到对应name部分的元素渲染进来。
app-layout的模板如下
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
父组件的渲染模板如下
```html
<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>
  <p slot="footer">这里有一些联系信息</p>
</app-layout>
```
渲染的结果就是
```html
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```
### 作用域插槽

就是在定义子组件的时候在slot上声明一个自定义属性，在父组件中用一个template标签的scope标签来接收这个字标签的props数据是一个对象。template会替换掉已经渲染的元素
```html
       <div id="app">
        <div>
            <childa>
                <template scope="props">
                    <span>Hello from parent!</span>
                    <span>{{props.text}}</span>
                </template>

            </childa>
        </div>
    </div>
    <script src="../vue.js">

    </script>
    <script>
          Vue.component('childa', {
            template: '<div>  <slot text="hello form child" style="color:red">   </slot></div>'
        });
        var app = new Vue({
            el: "#app"
        });
    </script>
```
这个结果会渲染出两个语句。
template标签也可以设置slot属性，对应的值就可以看成slot的Name属性
