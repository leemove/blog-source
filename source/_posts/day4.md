---
title: 草稿  
date:  2016-3-21 20:41:02  
categories: rubbish
tags: 废稿 
---

# day4

## 动态组件

可以使用保留好的`components`元素，再用v-bind来动态绑定他的is属性，可以让多个组件共同绑定这个标签

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```

```html
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```

### keep alive

当一个动态组件要多次来回切换同样几个组件的时候，可以用`kekp-alive`元素来包裹，这样可以缓存好原来的状态。

## 杂项

### 编写可复用组件

在编写一个组件的时候，要充分的考虑到组件的可复用性。一个组件的主要api有

- props 允许外部环境传递数据给组件内部
- Events 允许组件内部触发外部的事件
- slots润徐外部环境将额外的内容加载到组件内部
### 子组件索引
当需要在js中直接访问子组件，可以通过ref属性
```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```

```javascript
var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```

当ref和v-for一起使用的时候，ref是一个数组或者对象，包含着对应的子组件。他并不是响应式的，尽量避免在模板或者计算属性中使用。

### 异步加载

在有些时候需要异步的加载文件Vue可以把他们缓存起来，方便下次渲染

```javascript
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

## 组件的命名

在JS中Vue不关心你的命名形式，但是在html中必须遵守标准，用小写加横杠。

## 组件的递归

一个组件是可以调用自己的，这样就会造成递归，所以必须要有终止的条件，比如v-if。	

# 深入响应式原理

##  如何追踪变化

当你把一个js对象传入data的时候，Vue会对他设置setter和getter。

每个组件都有对应的watcher实例对象，他们会在组件渲染的过程中把他们记录为依赖，之后当依赖项的setter被调用的时候，会通知wacher重新计算，从而导致更新。

## 变化检测中存在的问题

如上述原理，当你给数据增加新元素的时候，setter是检测不到的，所以要使用Vue.set方法。

所以在声明响应式的属性的时候，尽量要写全，避免之后追加，也可以先声明一个空的数据。

更新和渲染页面的过程是异步的。

## 单元素/组件的过渡

Vue提供了`transition`的封装组件，在下列情形中，可以给任何元素的组件添加entering/leaving过渡

- 条件渲染 v-if
- 条件展示 v-show
- 动态组件
- 组件跟节点

在要使用过渡效果的元素上使用transition标签包裹设置name属性来寻找对应的类名。

## 过渡的类名

1. `v-enter`: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
2. `v-enter-active`: 定义进入过渡的结束状态。在元素被插入时生效，在 `transition/animation` 完成之后移除。
3. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
4. `v-leave-active`: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 `transition/animation` 完成之后移除。

用过渡元素的name属性来替换掉v就可以写入css了

小例子

```css
 /*设置过渡进入的效果*/
        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        /*设置过渡出的效果*/
        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        /*一般过渡的起始状态和结束状态可以用enter 和leave-active设置*/
        .slide-fade-enter,
        .slide-fade-leave-active {
            transform: translateX(10px);
            opacity: 0;
        }
```

```javascript
 new Vue({
            el: '#example-1',
            data: {
                show: true
            }
        })
```

```html
 <div id="example-1">
        <button @click="show = !show">
    Toggle render
  </button>
        <transition name="slide-fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
```

## CSS动画

CSS 动画用法同 CSS 过渡，区别是在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除。

## 自定义过渡类名

可以在过渡类名的后面加上-class，这个自己使用的类样式名优先于其他过渡样式，配合CSS动画库使用十分方便。

## 过渡事件

可以设定JS钩子，也就是回调函数，事件。

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

需要注意的是在enter和leave中，第二个参数done函数必须被调用一次。才能继续进行。尤其是仅用js过渡的动画，当你想仅用js来操作的时候可以设置`v-bind:css='false'`