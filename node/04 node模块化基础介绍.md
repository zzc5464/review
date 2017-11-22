

# nodeJs模块化基础介绍

>  在 node.js 开发中,每一个文件就可以认为是一个模块;

## node.js 模块分类

### 核心模块 Core Module .   也叫 内置模块、原生模块

>  比如：fs	    读写文件 

- 所有内置模块在`安装` node.js 的时候,就已经编译成二进制文件了, 可以直接加载运行(速度较快);
- 部分内置模块, 在 node.exe 这个进程`启动`的时候,就已经默认加载了,所以可以直接使用  ( module )


- 1. 提前准备好  2. 速度快 

#### 文件模块

> var a = require('./a'); 

- 说明 : 根据文件路径引入的模块

- 如果加载时,没有指定后缀名, 那么就按照如下顺序加载响应模块  

  > ( 例如 :  require ( ' ./demo  ' ))

  1. .js
  2. .json
  3. .node (C/C++编写的模块)

#### 自定义模块 ( 第三方模块 )

> var mime = require('mime');

- 需要额外通过 npm 安装的模块

## require 加载模块顺序

```
情况一：
1. 以'./'或'../'开头，先去找对应路径的文件（js>json>node）.
2. 找不到，会认为是文件夹（就认为是某个包）
 - 找到了,去加载包里的package.json里的main入口文件。
 - 没找到，加载失败。
 情况二：
 1. 直接传模块名字，先加载内置模块
 2. 从当前目录的node_modules文件夹找，一直往上层找。
 3. 没有就加载失败
```



### require 加载模块注意点

1. 所有模块第一次加载完毕后, 都会有缓存.
2. 每次加载模块的时候,都`优先从缓存中加载`,缓存中没有的情况下, 才会按照 node.js 加载模块的规则去查找,所以重复加载没意义.
3. 内置模块 在 node.js 源码编码的时候,都已经编译为二进制执行文件了,所以加载速度较快  
   - 内置模块加载的优先级 , 仅次于缓存加载
4. 如果 想加载的 第三方模块 和内置模块 重名
   - 只加载内置模块

- 除非: 通过路径的方式加载第三方模块

1. 内置模块,只能通过`模块名称`来加载,  (错误示例: require('./http') )
2. require() 加载模块使用 ./ 相对路径时，相对路径是相对当前模块，不受执行 node 命令的路径影响

> 演示:
>
> 1. a 引入 b 打印 log(99)
> 2. 多次 引入 b , 打印几次? 缓存?

### 补充 CommonJS 规范

1. [CommonJS 规范](http://www.commonjs.org/)
2. [CommonJS规范-ruanyifeng](http://javascript.ruanyifeng.com/nodejs/module.html)
3. 总的来说，这个规范就是用来开发大型项目用的。

### 模块之间是怎么通讯的

- 通过require引入的默认是个空对象
- 在需引入的文件中用return是没作用的
- 只有module.exports才能导出数据

```js
//b.js	add函数
function add(num1,num2) {
  return num1 + num2;
}
var num = add(20,20);
console.log(num);//40

//a.js引入b模块
var b = require('./a')   // 直接控制台打印40
console.log(b);   //{}，b是一个空对象

//b.js通过module.exports导出一个值
module.exports = 'hello world'//字符串
module.exports = 666//数字
module.exports = function () {
  //导出一个函数/对象是最常用的
    console.log('这是 b 模块里的值')
}
module.expotrs = {
  a:function(){}
}
```

- 小结：导入用`require`,导出用`module.exports`,
- module.exports最常见的用法是导出一个对象

### module.exports 介绍  ( 重点 )

> 用于导出当前页面的js

```
/**
 * 专门介绍一下 module.exports
 * 常见使用
 */
 //1. 它是默认是一个空对象
console.log(module.exports); // => {}
 //2. 可以直接导出一个对象
 module.exports = {
    age:19,
    name:' 哈哈',
    say:function () {
      console.log('say hello')
    }
  }

//3. 也可以通过添加对象的属性
module.exports.age = 12;
module.exports.name = '哈哈';
module.exports.say = function() {
  console.log('hello')
}
//4. 可以导出对象方法,利用它传值 (重点)
module.exports.play = function (playName) {
  console.log('玩'+playName);
}
module.exports.eat = function (food) {
  console.log('吃'+food)
}

//5.导出对象还有一个 exports
exports.drinking = function () {
   console.log('喝')
 }
```


### module.exports 与 exports 的区别

- 1. 两者都指向同一块  =>    **内存空间**;
  2. module.export > export
  3. 如果两个都返回了具体的对象，只返回module.export

- 源码

```js
 function require(/* ... */) {
      const module = { exports: {} };

      ((module, exports) => {
        // 模块代码在这。在这个例子中，定义了一个函数。
        function someFunc() {}
        exports = someFunc;
        // 此时，exports 不再是一个 module.exports 的快捷方式，
        // 且这个模块依然导出一个空的默认对象。
        module.exports = someFunc;
        // 此时，该模块导出 someFunc，而不是默认对象。
      })(module, module.exports);

      return module.exports;
    }
```
