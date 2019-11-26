---
title: ts泛型小记
date: 2019-8-12 18:31:39
tags: rubbish
---

# 泛型

泛型作为面向对象语言的一种常用功能,在typescript中同样也举足轻重.存在着许多应用场景.

<!-- more -->
## 根据参数设定函数的返回值

在动态语言中,函数的参数类型可以是动态的,在js中参数和返回值甚至可以为另外一个函数,ts在将语言静态化的同时,并不会压缩语言的原有功能,我们可以通过泛型来规范函数的入参和返回值.

```ts
function log<T>(item: T): T {
    console.log(item)
    return item;
}


const a1 = log(233) // 233
const a2 = log(Math.random()) // number
const a3 = log(Symbol('233')) // symbol


function getFirstItem<T>(list: T[]): T | null {
  return list.length > 0 ? list[0] : null;
}

const a4 = getFirstItem([3]); // number

/** 投放计划 */
class Plan {
  id: number;
  date: string;
}

const planList: Plan[] = [
  { id: 0, date: "2019/1/1" },
  { id: 1, date: "2019/1/2" }
];

const a5 = getFirstItem(planList); // Plan
```

这个函数的返回类型和输入类型为动态的,返回类型永远等于输入类型.避免了我们出现以下代码

```ts
function logString(item: string): string {
    console.log(item)
    return item
}

function logNumber(item: number): number {
    console.log(item)
    return item
}

```

## 配合类型签名自定义函数返回类型

在实际开发中,有些第三方来源的数据,数据生产过程并不在代码中,比如调用后台接口,或者Node服务中访问数据库,

```ts
// 类型签名
function getJSON<T>(config: {
  url: string;
  headers?: { [key: string]: string };
}): Promise<T> {
  const fetchConfig = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(config.headers || {})
  };
  return fetch(config.url, fetchConfig).then(
    response => response.json() as Promise<T>
  );
}

const c1 = getJSON<number>({ url: "abc.com" }); // Promise<number>
```

## 容器类

部分类的一些属性会存在动态类型,通常我们可以定义泛型,来描述这些动态属性.常见的有Promise<T>类,本身可以异步返回任易类型的数据.

```ts
// Vue3源码中的容器类
class Ref<T> {
  isRef: boolean;
  value: T;
}

function ref<T>(value: T): Ref<T> {
  return {
    isRef: true,
    value: value
  };
}

const b1 = ref(20); // Ref<number>
const b2 = ref("233"); // Ref<string>
```

## 有条件类型(类型推断)

可以根据泛型的基类进行类型推断,来定义其他类型.`T extends string ? string : number`类似于三元表达式,如果泛型基于string则该类型为string否则为number.

```ts
type D1 = <T>(
  arg: T
) => T extends string ? string : T extends number ? number : any;

// 实现类型
const getType: D1 = function(params: any) {
  if (typeof params === "string") return Math.random().toString();
  if (typeof params === "number") return Math.random();
  return params;
};
```

配合映射类型

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type person5 = Pick<Plan, "date"|"spell">;
/**
  {
    date: string;
    spell: number;
  }
/*
```

## 用于类型声明推倒(计算?)

可以用于类型的推倒,类似于js中的函数,但是只输入和返回类型.在实际业务中可能使用不多,但是几乎所有流行的ts库都有如下这样的代码.

```ts
// 声明一个对象,然后根据动态计算索引,根据索引来获取对象中的类型.
type WarpRef<T> = {
  string: Ref<string>;
  number: Ref<number>;
  date: Ref<Date>;
  any: Ref<any>;
}[T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends Date
  ? "date"
  : "any"];

type F1 = WarpRef<string>; // Ref<string>
type F2 = WarpRef<number>; // Ref<number>
type F3 = WarpRef<Date>; // Ref<Date>
type F4 = WarpRef<string[]>; // Ref<Date>
type F5 = WarpRef<string[]>; // type F5 = Ref<any>
```
