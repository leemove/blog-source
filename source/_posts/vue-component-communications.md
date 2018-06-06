---
title: vue组件通信的正确姿势
date: 2018-06-06 15:56:50
tags:
---

# Vue的组件通信

在组件化开发模式中,组件之间的数据通信往往是在开发中的难题.如果缺乏规范,很容易就会失去项目的可维护性.Vue亦是如此.

Vue提供了多种组件通讯方式,不仅仅局限于prop,$emit这对我们最常用的.下面简单列举下,经常使用的几种.

<!-- more -->

## 首推prop&emit

这是vue比较推荐的最基本的组件通信方式了,prop自上而下,emit自下而上.可以让人很容易的就理解了整个数据的流向.

### prop

prop用于将父组件的数据,传递到子组件.并且只能是这样的单项传递.

使用方法也很简单在子组件中声明属性名称,在父组件template中给子组件传递数据即可.

```js
Vue.component('child', {
  template: '<h1>子组件:{{ message }}</h1>',
  props: {
    message: String
  }
})

new Vue({
  el: '#app',
  data: {
    message: '我是父组件的数据哦'
  }
})
```

```html
<div id="app">
  <child :message="message"></child>
</div>
```

![image.png](https://tuchuang001.com/images/2018/06/06/image.png)

可以看到数据的传递方式是 父>子
### $emit

`$emit`和`prop`正好相反,负责把数据用事件参数的形式,从子组件传递到父组件.

子组件在js中使用`$emit`方法来触发一个事件,父组件则监听这个事件,来获取参数和数据.

```html
<div id="app">
  <h1>
    父组件: {{ message }}
  </h1>
  <child @change="eventHandle"></child>
</div>
```

```js
Vue.component('child', {
  template: '<h1>子组件</h1>',
  mounted () {
  console.log(this.$emit)
  	this.$emit('change', '我要从子组件传递数据啦')
  }
})

new Vue({
  el: '#app',
  data: {
    message: '我是父组件的数据哦'
  },
  methods: {
  	eventHandle (newMsg) {
    	this.message = newMsg
    }
  }
})
```

![image1e268.png](https://tuchuang001.com/images/2018/06/06/image1e268.png)

## vuex

为vue量身定做的状态管理,很庞大,这里不写demo了.可以去[文档](https://vuex.vuejs.org/zh-cn/structure.html)仔细看看


## 全局变量

如果我们设定好一个全局变量,同时作为数据传入两个组件中,其中一个被修改,另外一个自然也是同步的.

```html
<div id="app">
  <h1>
    父组件: {{ data.msg }}
  </h1>
  <child ></child>
</div>
```

```js
window.data = {msg: '全局变量'}

Vue.component('child', {
  template: '<h1>子组件</h1>',
  mounted () {
  	window.data.msg = '已修改的全局变量'
  }
})

new Vue({
  el: '#app',
  data: {
    data: window.data
  },
  methods: {
  }
})
```

![image5769b.png](https://tuchuang001.com/images/2018/06/06/image5769b.png)

## $ref $parent $root

这三个属性都是组件的实例,当然也可以直接访问组件的内容.当然也可以直接修改数据,也可以调用子组件的方法了.

```html
<div id="app">
  <h1>
  </h1>
  <child ref="child" ></child>
</div>
```

```js
Vue.component('child', {
  template: '<h1>子组件:{{ msg }}</h1>',
  data () {
  	return {
    	msg: '我是来自子组件的数据'
    }
  },
  mounted () {
  }
})

new Vue({
  el: '#app',
  data: {
  },
  mounted () {
  	this.$refs.child.msg = '作为父组件我要修改数据'
  }
})
```
![imagefbd3c.png](https://tuchuang001.com/images/2018/06/06/imagefbd3c.png)

## provide inject

熟悉angular的同学,可能一看见就知道这是写什么,但是vue实现的更加简便.

这是2.2版本新增的api,他们必须一起使用才能生效.这个属性并不推荐在业务代码中使用,更多是为了插件和组件库提供的.这里就不详解了.

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```