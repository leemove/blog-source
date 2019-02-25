---
title: principle
date: 2019-02-25 16:47:21
tags: typescript js
---

# TypeScript 的程序设计

在团队开发过程中,大部分开发者都由 js 转向了 ts.拥抱 ts 可谓趋势.在浏览大家的代码时,发现大家在写 ts 时忽略了一些语言的特性,还是按照 js 的套路去开发,在这个过程中造成了许多了问题.想聊一聊从 js 切换到 ts 的正确姿势.

## 设计原则

1.开闭原则（Open Close Principle）
对扩展开放，对修改关闭。

2.里氏代换原则（Liskov Substitution Principle）

只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。

3.依赖倒转原则（Dependence Inversion Principle）

这个是开闭原则的基础，对接口编程，依赖于抽象而不依赖于具体。

4.接口隔离原则（Interface Segregation Principle）

使用多个隔离的接口来降低耦合度。

5.迪米特法则（最少知道原则）（Demeter Principle）

一个实体应当尽量少的与其他实体之间发生相互作用，使得系统功能模块相对独立。

6.合成复用原则（Composite Reuse Principle）

原则是尽量使用合成/聚合的方式，而不是使用继承。继承实际上破坏了类的封装性，超类的方法可能会被子类修改。

## 工厂方法

使用静态方法替代 new 操作,可以再工厂方法中增加一些常用的逻辑.

```ts
interface Car {
  run(): any;
}

class A implements Car {
  run() {
    console.log("A running");
  }
}

class B implements Car {
  run() {
    console.log("B running");
  }
}

export class CarFactory {
  static getA() {
    return new A();
  }
  static getB() {
    return new B();
  }
}

class PageComponent {
  car: Car;

  constructor(type: "a" | "b") {
    if (type === "a") {
      this.car = CarFactory.getA();
    } else if (type === "b") {
      this.car = CarFactory.getB();
    }
  }
}
```
