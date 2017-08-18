---
title: 草稿  
date:  2016-3-21 20:41:02  
categories: rubbish
tags: 废稿 
---

# render函数

我们有很多种方式来创建模板，可以直接在组件中声明，可以在script标签中声明，然后把选择器传到template属性。

也有一种新的方法，用render函数，一般通过createElement
```javascript
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```
## creatElemtn的参数
```javascript
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数，必要参数
  'div',
  // {Object}
  // 一个包含模板相关属性的数据对象
  // 这样，您可以在 template 中使用这些属性.可选参数.
  {
    // (详情见下一节)
  },
  // {String | Array}
  // 子节点(VNodes)，可以是一个字符串或者一个数组. 可选参数.
  [
    createElement('h1', 'hello world'),
    createElement(MyComponent, {
      props: {
        someProp: 'foo'
      }
    }),
    'bar'
  ]
)
```
## 深入了解data object参数
```javascript
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 "on"
  // 所以不再支持如 v-on:keyup.enter 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  // Vue 会为您持续追踪
  directives: [
    {
      name: 'my-custom-directive',
      value: '2'
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => h('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为slot指定名称
  slot: 'name-of-slot'
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```
以上这些的属性会被区别对待，就像模板中的:class和:style一样
## 约束
VNodes必须是唯一的。不可以在createElement中重复元素。比如
```javascript
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 错误-重复的VNodes
    myParagraphVNode, myParagraphVNode
  ])
}
```
如果要真的创建很多个相同的Vnodes可以使用不同的引用类型的地址。利用工厂函数来实现
```javascript
render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}
```
这段创建了20个重复的vnodes
## 使用js来代替模板引擎
模板引擎中的常用指令v-if和v-for，Vue在JS中并没有给他们实现对应的API，可以直接用js编写。
```html
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```
可以重写成
```javascript
render: function (createElement) {
  if (this.items.length) {
    return createElement('ul', this.items.map(function (item) {
      return createElement('li', item.name)
    }))
  } else {
    return createElement('p', 'No items found.')
  }
}
```
v-mode的实现也没有API
```javascript
 render: function (createElement) {
                        var self = this
                        return createElement('input', {
                            domProps: {
                                value: self.value
                            },
                            on: {
                                input: function (event) {
                                    self.value = event.target.value
                                }
                            }
                        })
                    }
                
```
## 事件按键修饰符
对于 .capture 和 .once事件修饰符, Vue 提供了相应的前缀可以用于 on:
Modifier(s)	Prefix
.capture	!
.once	~
.capture.once or
.once.capture	~!

```javascript
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  `~!mouseover`: this.doThisOnceInCapturingMode
}
```
## 函数化组件
函数化组件的一切都需要上下文来进行传递
```javascript
Vue.component('my-component', {
  functional: true,
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  },
  // Props 可选
  props: {
    // ...
  }
})
```
要传递的属性有
- props: 提供props 的对象
- children: VNode 子节点的数组
- slots: slots 对象
- data: 传递给组件的 data 对象
- parent: 对父组件的引用
  通常为了以下的目的我们可能会使用到函数化组件
- 程序化地在多个组件中选择一个
- 在将 children, props, data 传递给子组件之前操作它们。
------------------------------------------

放弃
------------------------------------------

#自定义指令
## 简介
全局定义
```javascript
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。 inserted是钩子函数
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
## 钩子函数
- bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
- componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
- unbind: 只调用一次， 指令与元素解绑时调用。
## 钩子函数的操作
- el 要被操作的DOM元素
- binding一个包含许多属性的对象
    - name: 指令名，不包括 v- 前缀。
    - value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
    - oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    - expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
    - arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
    - modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 {    - foo: true, bar: true }。  
- vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
- oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用  

```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```
当写成上述的形式的时候，相当于绑定了bind和update钩子。
## 对象字面量
当指令需要多个参数的时候，可以传入一个字面量对象。
```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
然后通过`binding.value`来访问。
#混合
## 基础
混合是需要单独定义的一个对象，当组件内部调用混合的时候，混合中的数据会被混入组件。
```javascript
// 定义一个混合对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// 定义一个使用混合对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // -> "hello from mixin!"
```
## 选项合并
当混入的数据和组件本身的数据发生冲突时，将发生类似Vue.extend方法的数据合并。
钩子冲突时，两个钩子都会被调用，先调用混合对象的钩子，值为对象的选项，将会被混合成一个对象，当键名冲突的时候，将会取用组件的键值。
## 全局混合
```javascript
// 为自定义的选项 'myOption' 注入一个处理器。 
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// -> "hello!"
```
全局混合会影响所有实例
# 插件
## 开发插件
插件通常会增加一些全局的功能
1. 添加全局方法或者属性，如: vue-element
2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
3. 通过全局 mixin方法添加一些组件选项，如: vuex
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router
   插件的使用规范，都应该给全局对象添加一个公开方法install，这个方法第一个参数是Vue构造器，第二个参数是可选对象。
##　使用插件
通过全局方法使用插件`Vue.use()`,也可以传入一个选项对象。
```javascript
Vue.use(MyPlugin, { someOption: true })
```
Vue.use会阻止注册相同插件多次
