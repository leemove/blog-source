---
title: ajax入门  
date:  2016-5-1 10:39:02  
categories: javascript
tags: 
---
# ajax入门
AJAX即“Asynchronous JavaScript and XML”（异步的JavaScript与XML技术），指的是一套综合了多项技术的浏览器端网页开发技术。还会介绍Jquery封装的ajax和跨域问题。
<!--more-->
## 何为异步 

在网页加载的过程中，浏览器需要不断的从服务器通过http协议获取资源，来完成加载。主要方式有同步方式，和异步方式。在同步方式中，浏览器必须和服务器保持同步，只有相互间收到反馈时才会进行下一步，而异步则是不需要等待，直接进行下一步。

在传统的网页中，当提交表单的时候需要刷新整个页面，而新页面大部分页面和原页面相同。而通过异步技术可以只改变网页部分的内容，不需要刷新整个网页，大大减少了服务器的负担，但也伴随着浏览器无法后退的缺点。
## 如何通过JS发送异步请求
AJAX不需要浏览器插件的支持，对服务器来说也只是一个普通的请求，只需要浏览器提供XMLHttpRequest对象。在老版本IE中存在兼容性问题，这里就不讨论了。
1. 新建一个AJAX对象
` var xhr=new XMLHttpRequest();`虽然对象名称包含XML，但实际上是可以传输其他数据的，比如JSON。
1. 打开连接
  `xhr.open("GET","1.php?username=leemove&password=what");`

     open函数包含了两个参数，第一个参数是HTTP协议的传输类型，主要使用的有POST，GET。第二个参数是请求的url如果是GET方法需要在地址后面加上?后面写传送的数据用&隔开。

     ### tips: GET POST的区别

     - GET发送的数据要写在URL中，部分情况下可能会显示到浏览器的地址框中，GET没有请求体，不太安全。POST的数据会放在请求体中，相对安全。
     - 因为GET的数据在地址栏中，所有会有大小的限制，当传送大量的数据时，要使用POST。
     - POST在AJAX中必须设置q请求头`Content-Type:application/****`
     - GET因为没有请求体，性能会高一些。
1. 发送数据
`    xhr.send(null);`因为GET没有请求体，所以发送的数据就是null，如果是POST可以发送内容。
1. 接收数据
```
   //注册事件当状态改变时触发
    xhr.onreadystatechange=function () {
        //判断当前的传输是否完成
        if(this.readyState==4&&this.status==200){
            //接收数据
            var data=this.responseText;
        }
    };
```
onreadystatechange事件将会在状态改变的时候被触发。
readyState参数分别对应了五个状态

    0：尚未初始化。未调用open()之前

    1：启动。调用open()之后，但是未调用send();

    2：发送。调用send()但是尚未得到响应。

    3：正在接收数据。刚接收到响应数据开始到接收完成之前。

    4： 完成。数据接收完成
status指HTTP中的状态码，常见的状态码有

    200：OK

    304： 数据未修改，可以调用缓存，根据最后修改事件判断。

    404：没有请求的资源

    500：服务器内部错误

    405：请求的方式不支持

    302：请求的方式不支持

    403：没有访问的权限
     
responseText也可以换成responseXML只是接受的数据格式不同。
## jquery封装的AJAX方法。
ajax也为我们封装了ajax方法，可以通过全局变量$来直接调用。
方法需要一个对象作为参数，对象可以有以下的属性：
* type 传输的类型，可以是GET---
* data 要传输的数据 可以是字符串，但最好使用JSON
* dataType 数据的类型，平时可以不设置，但跨域则必须使用jsonp，下一节将会讲解跨域
* success 成功时会调用的回调函数，并且会把接收到的数据作为参数传入这个函数
* error 错误时调用的回调函数
* beforeSend 在发送数据之前调用的函数。
* 还有很多其他的不太常用的 可以通过Jquery的手册来查看
### 调用急速数据的天气接口案例
只是简单的一个小例子，并不需要完全理解其他内容。
```javascript

        $.ajax({
            type: 'get',
            url: "http://v.juhe.cn/weather/index",
            success: function (daa) {
                console.log(daa);
                var html = template("templateId",daa);
                console.log(html);
                $('tbody').append(html);
            },
            data: {
//                城市名                
                cityname: str,
                //*****注意这里要输入你自己的key
                key: "我是马赛克，输入你自己的KEY"
            },
            dataType: "jsonp"
        });
```
## 跨域

### 什么是跨域请求
理解跨域必须先理解同源，同源策略是浏览器的一个安全策略，浏览器只会支持同源的请求，所谓的同源也就是指必须有相同的域名，端口,以及协议。

如果 请求不是同源的，那么将会进行跨域，而浏览器为了安全考虑会阻止这个请求，但实际生产中，我们有时候必须进行跨域。
```
例如http://www.example.com/
http://api.example.com/detail.html  不同源 域名不同  
https//www.example.com/detail.html   不同源 协议不同  
http://www.example.com:8080/detail.html    不同源    端口不同  
http://api.example.com:8080/detail.html    不同源    域名、端口不同  
https://api.example.com/detail.html    不同源    协议、域名不同  
https://www.example.com:8080/detail.html    不同源    端口、协议不同  
http://www.example.com/detail/index.html    同源    只是目录不同  
```
### 如何阻止浏览器的拦截跨域行为？？
常见的方法有两种，一种是jsonp，一种是CORS

jsonp就是利用SRC属性可以跨域的特点。新建一个script标签，并将src设置成请求的url，所以只能用GET请求。然后将script标签加入到页面中，当解析到这个标签的时候就会执行内部的代码。所以可以传入一个回调函数callback，对应自己已经编写的一个函数名，然后将数据当做参数传入。返回的数据格式会是'callback('+json+')';
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body>
       <button id="button">请求数据</button>
</body>
<script>
    window.onload=function(){
        var button=document.getElementById("ibutton");
        function callback(data){
            //处理data
        }
        button.onclick=function(){
            var script=document.createElement("script");
            script="http://www.sasd.com/json/?callbak=callback"; 
            document.body.insertBefore(script,document.body.firstChild);//加载脚本
            
        }
        
    }
</script>
</html>
```
另外一种方法是CORS是利用协议。当浏览器发送请求时，会在请求中标注自己的域名，`origin:客户端所在的域`服务器如果在x响应头中添加`Access-Control-Allow-Origin:请求的客户端地址`然后再发给客户端，客户端的浏览器就会允许跨域。



