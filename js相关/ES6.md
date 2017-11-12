# ES6语法入门

> 常见的新特性:let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments

## 新的声明变量方式

1. let
   - 为了解决js中没有局部作用域
   - let声明的变量就只有在它的作用域生效
   - **不存在变量提升**
   - 不允许重复声明

```js
//原来的var声明方式，会改变全局的name
//两次都是奥巴马
var name = 'zach'

while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //obama

//let  声明则只在它的局部及它内部的作用域中生效
let name = 'zach'

while (true) {
    let name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //zach
```

2.  const

- 特性和let一样
- 声明后无法更改值
- 本质上是保证值得内存地址不得变动，值类型是内存地址，引用类型是指针。

```js
        const pi = Math.random()
        for(var i = 0;i<10;i++) {
            console.log(pi);
        }
//十个随机数都会是一样的
const monent = require('moment');//应用场景
```

- 常用于引入第三方库的文件，可以防止更改报错。

## class, constructor,extends, super

```js
class Animal {
    constructor(){//实例对象的方法
        this.type = 'animal'
    }
    says(say){//注意，不用再写function定义了，而且不要使用,分割方法，否则报错
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super();//指父类的实例，父类的this
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
```

#### class

- 定义一个构造函数，相当于以前的function Animal(){}。
- es6必须用new调用，而es5定义的构造就是一个普通的函数
- class 可以写成表达式的形式

```js
        let fn = class Me{
            say(){
                console.log(111);
            }
          	myname(){
              return Me.name
              //name属性是函数本来就有的，代表函数名
          	}
        }
        var a = new fn();
        a.say();
```



#### constructor(){}

- 相当于new出来实例的方法，就像以前写的this.xxx，是实例自身的属性和方法。
- 每new一个实例都自动调用里面的方法
- 如果没写，在new的时候会默认生成一个空的constructor方法

```js
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```



- 写在这个函数以外的方法都是原型方法，会被所有实例共享。
- 如果在此方法中return了一个对象就会导致实例对象不是类的实例了

#### extends

- es6定义的继承关键字

```js
class 新构造函数 extends 父级构造函数｛｝
```

- 这样就实现了继承
- 然后要配合super关键字使用

#### super

```js
    constructor(){
        super();//指父类的实例，父类的this
        this.xx = '';//这里就是修改继承后的实例的属性
    }
//ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this
```

- 固定写法，继承后写在构造方法（constructor）里面。
- super()包含的是父类的实例和父类的this。

#### Object.assign(prop,{})

- 对应es5中的，对象.prototype = {}
- 可以用来批量给实例对象的原型添加方法。
- es6对象原型的方法无法枚举，用es5的写法就可以

```js
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
//给Point对象的原型添加toSrting和toValue方法
```



## arrow function

```js
//5
function(x, y) { 
    x++;
    y--;
    return x + y;
}
//6
(x, y) => {x++; y--; return x+y}
```

- 就是省去了function的书写。
- 简洁明了
- 箭头函数**本身没有this指向**，它的this都是继承来的。

```js
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        setTimeout( () => {
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}
 var animal = new Animal()
 animal.says('hi')  //animal says hi
```

- 本来定时器里写函数会改变this的指向变成window
- 但是箭头函数的this是继承来的所以这样写没问题。

## template string

```js
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

- 使用`号标识起始
- ${}包裹需要的变量
- 所有的空格和缩进都会被保留在输出之中

## destructuring（解构赋值）

- 给对象赋值

```js
//es5
let cat = 'ken'
let dog = 'lili'
let zoo = {cat: cat, dog: dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}

//es6新写法
let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
//就是说键和变量名如果一样就可以省略了
```

- 同时赋值

```js
        let [a,b,c] = [1,2,3];
        console.log(a,b,c);//123

		let dog = {type: 'animal', many: 2}
		let { type, many} = dog
		console.log(type, many)   //animal 2
```

## default, rest

#### default

- 实现默认值的写法

```js
//es5给默认值是用||实现
function fn(a){
  a = a || "";
}

//es6写起来就像php了
function fn(a="哈哈") {
  console.log(a);//“哈哈”
}
```

#### rest

```js
        function animals(...types){
            console.log(types)
        }
        animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```

- 就是es5的arguments