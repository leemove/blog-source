---
title: angular的Provider
date:  2018-5-1 10:39:02  
categories: javascript angular
tags: 
---

# Provider

在angular中,如果我们要使用依赖注入,那我们必须先注册一个Provider供应商,本身有以下几种:
[原地址](https://angular.cn/api/core/Provider)

1. TypeProvider
1. ClassProvider
1. ValueProvider
1. ExistingProvider
1. FactoryProvider

<!-- more -->
他负责描述和Token相关的依赖对象的创建方式,在angular中,有以下几种创建方式.

1. useClass
1. useValue
1. useExisting
1. userFactory

```ts
export interface TypeProvider extends Type<any> {
}
export declare const Type: FunctionConstructor;
export declare function isType(v: any): v is Type<any>;
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
```

## TypeProvider

可能看起来这几种类型都比较陌生,其实我们已经使用过了`TypeProvider`和`useClass`.

```ts
    providers: [HeroService] // 缩写形式
    // 完全体
    providers: [{
        provide: HeroService, useClass: HeroService // 方式二
    }],
```

其实我们使用的是一个语法糖,完全体是有`useClass`的,假设有一天我们想把这个阶段暂时替换成mock数据,那我们直接修改`useCalss`就足够了.

## FactoryProvider

```ts
export interface FactoryProvider {
  // 用于设置与依赖对象关联的Token值，Token值可能是Type、InjectionToken、
  // OpaqueToken的实例或字符串
  provide: any;
  // 设置用于创建对象的工厂函数
  useFactory: Function;
  // 依赖对象列表
  deps?: any[];
  // 用于标识是否multiple providers，若是multiple类型，则返回与Token关联的依赖
  // 对象列表
  multi?: boolean;
}
```

假设我们现在要记录所有和服务器的交互,我们需要一个`logger`服务.

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  constructor(private enable: boolean) { }

  log(message: string) {
      if (this.enable) {
         console.log(`LoggerService: ${message}`);
      }
  }

}
```

同时更新hero组件

```ts
 providers: [HeroService, LoggerService] 
 ```

 会报错` NullInjectorError: No provider for Boolean!`,是因为我们并没有办法给logger传递参数.这种情况下,我们可以使用`useFactory`.

 
 ```ts
 import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service'; // 引入我们依赖的类型
import { LoggerService } from '../logger.service';

function factory() {
  return new LoggerService(true);
}

@Component({
  selector: 'app-hero',
  template: `
    <ul>
      <li *ngFor="let hero of heros">
        ID: {{hero.id}} - Name: {{hero.name}}
      </li>
    </ul>
  `,
  styleUrls: ['./hero.component.css'],
  providers: [HeroService, { provide: LoggerService, useFactory: factory}] // 声明我们的供应商
})
export class HeroComponent implements OnInit {

  public heros: { id: number; name: string }[];
  constructor(private hs: HeroService, private logger: LoggerService) { } // 在构造函数的参数中,声明我们的依赖

  ngOnInit() {
    this.logger.log('请求英雄列表');
    this.heros = this.hs.getHeros();
  }

}
```