---
title: 4-18面试旅程
date: 2017-04-18 18:31:39
tags: rubbish
---

#  面试

总结下这几天面试的经历吧,槽点满满.会有问题,和心路.

面试了两家公司,感觉机会都不大,薪资也是随便要的.

<!--more-->

## 第一天

面试了一个创业公司,老总直接面试,老总不太懂技术,这就很尴尬了,我看的出来他有一个伟大的梦想.但是我和他沟通不到一起去,这里就不多说了.公司的环境给我很大的落差感,感觉不太适合我.

## 第二天

以为是一个网络公司,以为这下可好了,毕竟通信出身,网络问题没毛病啊,就怕不问这些通信协议.

可是我万万没想到啊,其实是一家金融公司,想开发一个PC端的金融产品商城,还有微信端JS,SDK的开发,移动端Rn,这个就很悲剧了.一路做两小时地铁干到东直门.面试我的竟然是一个94年的小妹,嗯,很漂亮,我毕竟中年人,世界是他们的.哭..好处就是感觉可以稍微放松点,不是特别紧张.

# 问题

第一天没有问到什么问题,面试官是老总就问了下H5,和一些简单的知识点这里就不重复了.

第二天美女小妹面试的问题有

- angular,router表示hash值的参数是哪一个

  ​	完全不记得,一点印象都没有了,第一个问题就悲剧了.

- angular ng-if,ng-show的区别
  记忆中还有点印象,大概的和他说了一遍

- angular的双向绑定

  ​	这个问题比较了解,大概给妹子说了一遍,但是好像说的不太透彻

- angular的控制器之间的通信

  ​	这个问题就很坑爹了,好像有漏答,不过说出来了一两种常用的方法

- ng-repeat的$index索引

  ​	这个问题很简单不聊了

- ng-repeat相同的值报错问题怎么解决

  ​      回答是把数据修改成引用类型的数据,因为引用类型在JS底层是不会判断相等的,不知道对不对

-+------------------------------------------------------------------------------------------自定义指令
  里面怎么接收的数据
- angular过滤器

  ​	简单了说了下,然后让我写一个把字体变红的过滤器,完全懵逼,会真的有人记住这种细节问题吗,于是进行了一个判断,然后返回了一个p标签,加上了个calss然后三元表达式还没写冒号和后面半句,紧张了
- 封装过jq插件吗,为什么使用自执行函数

  自执行主要是为了防止变量对全局作用域的污染,有什么更好的方法吗,我回答的是通过第三方的模块化工具,比如requireJs,webpack等等.

- jquery angular Vue 之间的区别

    感觉这是一个主观问题,我站在使用者角度说了一些,感觉她也不是很满意.

- 然后是CSS问题,问了inline和inline-block的区别

  ​	这个问题我以为很基础根本不会有人问的,结果她真的问了,我真的没准备,平时用起来都是凭直觉,不好使换换,这方面真的没注意

- 然后清除浮动的几种方式

   回答了伪元素,ovh等等常用的方法,果然不出所料问我bfc了.bfc这个东西单拿出来感觉比整个js都难,非常简略的讲了一讲,感觉回答的不是很好.
- flex布局.如何让盒子居中
   CCS3是我最头疼的了,好多单词根本没记住,只把思路说了一下.

－　angular的一些具体问题

  比如页面上的手风琴特效之类的细节问题

##　总结
总以为会问一些相对高大上，难度复杂点的问题，最少也是从异步交互,一直问到nodeJs啊,结果问的都是些基础，很伤心，越问越简单，越问越没底，本来会的一些东西，一着急就说不出来了，还有很多问题有更好的回答，当是一时语塞，都没讲出来自己的想法．

悲剧的一天就这样结束了,估计面试会越来越少了,也不知道后续能不能达到一天一面.

###  一些我想说的话
其实内心是有点不开心的,一些朋友们,技术和我差不多的,都找到了非常棒的工作,而我始终认为我自己并不比他们差,论技术,我真的不怂.可是现实并不是完全靠技术的.是很多复杂的因素东西结合在一起,叫做`运`.好运气,只是表象,很多深层的条件,准备才能得到这种好运气.

追求卓越吧,不要去追逐成功.

我会把这些面试题总结出来,有时间的时候上传到博客.