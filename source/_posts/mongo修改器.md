---
title: mongo修改器
date: 2018-01-21 16:47:08
tags: MongoDB
---
# mongo修改器

当一个文档只有一部分需要更新的时候,可以使用`原子性修改器`,修改器是一个特殊的键,可以用来指定一些复杂的操作.

<!-- more -->

## 增加和减少$inc

很多场景下,我们需要对数字进行增减操作,如果不使用修改器,我们可能先需要读取一次数据,进行运算,然后存储一次数据,这就需要进行两次数据传输,而修改器可以避免这种情况.

假设我们需要记录这个网站每天访问的人数.

```bash
> db.trace.find()
{ "_id" : ObjectId("5a6450e5845850137ae288b1"), "url" : "www.baidu.com", "view" : 0}
```

如果有一个新用户访问,我们只要让`view`字段加1.

```bash
> db.trace.update({url: "www.baidu.com"}, {"$inc": {view: 1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.trace.find()
{ "_id" : ObjectId("5a6450e5845850137ae288b1"), "url" : "www.baidu.com", "view" : 1}
```

可以看到访问量增加了1.

需要注意的是因为`$inc`的操作都是数字的增减,所以对字段是有要求的.操作的字段必须是`数字类型`,不能是其他类型,比如布尔或者字符串等`非数字类型`.

## 设置属性$set

类似js中的set,给一个对象设置一个属性,如果这个属性已经存在那么将会被替换,如果不存在,则设置这个属性.

```bash
> db.users.find()
{ "_id" : ObjectId("5a64570de6bff0acd507e0db"), "name" : "joe", "age" : 30, "sex" : "male", "location" : "Wisconsin" }
```

假设他很喜欢看电影.

```bash
> db.users.update({name:'joe'}, {$set: {hobbies: 'film'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find()
{ "_id" : ObjectId("5a64570de6bff0acd507e0db"), "name" : "joe", "age" : 30, "sex" : "male", "location" : "Wisconsin", "hobbies" : "film" }
```

有一天他看了逐梦演艺圈之后,对电影失去了信息,只喜欢看书了.

```bash
> db.users.update({name:'joe'}, {$set:{hobbies: 'book'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find()
{ "_id" : ObjectId("5a64570de6bff0acd507e0db"), "name" : "joe", "age" : 30, "sex" : "male", "location" : "Wisconsin", "hobbies" : "book" }
```

他又爱上了烹饪,`$set`同样支持改变数据的类型.我们需要把类型改变成`数组`.

```bash
> db.users.update({name: 'joe'}, {$set: {hobbies: ['film', 'cook']}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find()
{ "_id" : ObjectId("5a64570de6bff0acd507e0db"), "name" : "joe", "age" : 30, "sex" : "male", "location" : "Wisconsin", "hobbies" : [ "film", "cook" ] }
```

最神奇的是`$set`可以修改文档内部.只要在`$set`的值中,键用js一样的逗号操作符就可以了.

可以设置就同样可以删除,删除使用`$unset`.

```bash
> db.users.update({name:'joe'}, {'$unset': {hobbies: 1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.users.find()
{ "_id" : ObjectId("5a64570de6bff0acd507e0db"), "name" : "joe", "age" : 30, "sex" : "male", "location" : "Wisconsin" }
```

### 注意点

其实`$set`只是替换局部,而单纯的使用`update`是整体的替换,要十分注意这一点.

## 数组操作

### $push 增加

`$push`和`$set`类似,在属性为空的时候,会创建一个数组,并且填入,当属性为一个数组的时候,会在数组的最后添加.

```bash
> db.blog.find()
{ "_id" : ObjectId("5a6461549b78fd5cc9dd280a"), "title" : "A blog post", "content" : "lorem" }
> db.blog.update({content: 'lorem'}, {$push: {comments: {content: '66666', name: 'lee'}}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.blog.find()
{ "_id" : ObjectId("5a6461549b78fd5cc9dd280a"), "title" : "A blog post", "content" : "lorem", "comments" : [ { "content" : "66666", "name" : "lee" } ] }
```

再来一条评论

```bash
> db.blog.update({content: 'lorem'}, {$push: {comments: {content: '常规操作', name: 'zhang'}}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.blog.find()
{ "_id" : ObjectId("5a6461549b78fd5cc9dd280a"), "title" : "A blog post", "content" : "lorem", "comments" : [ { "content" : "66666", "name" : "lee" }, { "content" : "常规操作", "name" : "zhang" } ] }
```

### $each 等

当你一次需要添加多条评论的时候可以使用`$each`.

```bash
> db.blog.update({content: 'lorem'}, {$push: {comments: {$each: [{name: 'wang', content: 'hahahah'}, {name: 'wu', content: 'heheheheheh'}]}}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.blog.find()
{ "_id" : ObjectId("5a6461549b78fd5cc9dd280a"), "title" : "A blog post", "content" : "lorem", "comments" : [ { "content" : "66666", "name" : "lee" }, { "content" : "常规操作", "name" : "zhang" }, { "name" : "wang", "content" : "hahahah" },
{ "name" : "wu", "content" : "heheheheheh" } ] }
```

`$slice`可以始终帮你保留数组的最后几位,只能传入`负整数`
