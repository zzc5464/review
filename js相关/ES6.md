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

## 结构赋值

> ES6的语法糖，并不是新的功能。
>
> 可以更简洁的声明变量

```js
        //es5的语法
		var obj = {
            name: "张志潮",
            age: 24
        }

        var name = obj.name;
        var age = obj.age;
		
		//es6
//只有变量名和属性名一直的时候，才可以简写
var {name,age} = obj;
```

- 数组形的解析赋值

```js
var arr = [1,3,4,6];
var [n1,n2,n3,n4] = arr;
//n1 = 1; n2 = 3;n3 = 4; n4 = 6

var arr2 = [1,2,3,4,5];
var [...a] = arr;
//a = 1,2,3,4,5
```

- 还有更多嵌套层次的声明方式，但是最好不要给自己找事

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

####静态方法

> 给构造函数添加静态方法，`Point.xxx()`

```js
class Point{
  contructor(){}
  //添加static关键字，就是静态方法
  static say(){}
}
```




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
- 父类如果有传参，要在super和子构造里面传同样的参数接收

```js
// 父传参，子要接收参数，必须使用super()。
// 子的构造和super都要写形参
class Fa {
  constructor(name,money){
    this.name = name;
    this.money = money;
  }
}
class Son extends Fa {
  constructor(name,money){
    super(name,money);
    //这里才能添加自己的属性
  }
}
var fa = new Fa('zs',180000)
```



#### Object.assign(prop,{})

- 将两个对象合并，会影响作为第一个参数的对象
- 可以用来批量给实例对象的原型添加方法。
- es6对象原型的方法无法枚举，用es5的写法可以

```js
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
//给Point对象的原型添加toSrting和toValue方法

let obj  = {
    name:'zs'
}
let obj2 = {
    age:18,
    job:function(){
        console.log(111);
    },
    son:{
        name:'ww'
    }
}
let obj3 = Object.assign(obj,obj2);
console.log(obj);
console.log(obj2);
obj2.son.name = 'zl';
console.log(obj3);
```

## keys,values,entries（条目）

> 遍历对象的方法

- key遍历对象的键
- values遍历对象的值
- entries遍历对象并返回键值对数组

```js
var obj = {
    name:'zs',
    age:'19',
    run:8000
}
console.log(Object.keys(obj));//["name", "age", "run"]
console.log(Object.values(obj));//["zs", "19", 8000]
console.log(Object.entries(obj));//[Array(2), Array(2), Array(2)]
```



## arrow function

```js

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
- 箭头函数**本身没有this指向**，它的this都是外层函数的。

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

- 但是箭头函数的this是外层来的所以这样写没问题。

- **箭头函数没有arguments**

  - ```js

    var fn = function(a,b){
      	var test= _=>{
          console.log(arguments)
          //拿不到
      	}
    }
    fn(1,2)
    ```

  - 如果一定要拿箭头函数的实参怎么办？使用`rest`.

### 箭头函数的特色

1. 匿名函数省略function的书写
2. 当参数只有1个的时候省略（），并且只有一条return语句，可以默认return
3. 小技巧： 当不传参数又想省略()怎么办？写个`_` 假装有一个参数要传

```js
let arr = [1,2,3,4,5];
//es5写法
arr.map(function(item){
  return item + 1 ;
})
/*-------------es6变身一段______*/
arr.map((item)=>{
  return item + 1;
})//1.省略function加上=>

/*-------------es6变身二段______*/
arr.map( item =>{
  return item + 1;
})
//1.省略function加上=>
//2.只有一个参数省去() 

/*-------------es6变身三段______*/
arr.map( item =>{ item + 1 });
//1.省略function加上=>
//2.只有一个参数省去() 
//3. 只有一条return语句，可以省去return
```



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

> 不是说有这两个关键字，而是有这两个概念
>
> 比如default就是新加了一个概念，叫做默认值
>
> rest对应es5的arguments，但这个rest是真数组

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

#### rest（...）

```js
var test = (a,b,c){
  console.log(arguments)
}
test(1,2,3)//结果是毛都没有

//箭头函数要用...来拿
var test1 = (...arr){
  console.log(arr)
}
test1(1,2,3)//拿到了
```

- ...必须放在形参的最后一个，在函数内部可以使用...后面写的形参名拿到所有的实参
- arguments是伪数组，...rest拿到的是真数组
- ...rest同样可以在任何形式定义的函数中设置，不局限于箭头函数

## 新的API

### Math对象

```js
//判断是否为整数，可以判断负整数以及字符串里面的数字。
Math.sign()

//去除一个数里面的小数部分
Math.trunc()
```

### Array对象

- Array.from(),可以将字符串、对象、伪数组转换成真数组
- Set对象，里面的值都是唯一的。

> 新出的数据结构，用来数组去重非常合适

```js
var arr = "大潮哥";
console.log(Array.from(arr));//["大", "潮", "哥"]

var r = Array.from(arr);
console.log(new Set(r));//Set(3) {"大", "潮", "哥"}
```

- arr.find(条件)
- arr.findIndex(条件)

```js
//返回数组第一个符合条件的结果，没有的话undefined
console.log([1,2,3,4,5].find((n)=>n>2));//3
//返回数组第一个符合条件的索引，没有的话undefined
console.log([1,2,3,4,5].find((n)=>n>2));//2
```

```js
//includes，返回数组是否有包含某一项
console.log([1,2,3].includes(2));//true
```

### String对象

- str.repeat(次数). 重复一个字符串多少次

```js
var str = "zzc";
console.log(str.repeat(3));//zzczzczzc
```

#### 判断位置的方法

> 三个方法都接收第二个参数，表示开始检索的位置

- includes：是否找到了参数字符串,返回布尔值
- startsWith ：参数字符串是否在原字符串的头部,返回布尔值
- endsWith ：参数字符串是否在原字符串的尾部,返回布尔值

```js
console.log(str.includes('z'));//true
console.log(str.startsWith('z'));//true
console.log(str.endsWith('z'));//false
//从第三个位置开始找，全是false
console.log(str.includes('z',3));
console.log(str.startsWith('z',3));
console.log(str.endsWith('z',3));
```

#### 补全字符串长度

> 比如某些特定的input表单要固定长度，节省用户麻烦

- padStart(长度,要补全的字符串)

- padEnd

  ```js
  var str = '呵呵呵';
  console.log(str.padStart(10,'潮'));//潮潮潮潮潮潮潮呵呵呵
  console.log(str.padStart(10,'澳门首家线上赌场上线了'));//澳门首家线上赌呵呵呵
  console.log(str.padEnd(10,'潮'));//呵呵呵潮潮潮潮潮潮潮
  ```

  ​

## Promise对象

> 1. 初衷是为了解决回调地狱,是一个专门做异步的对象
> 2. 使得代码更容易阅读
>
> `new Promise(function(resolve,reject){})`

### promise的状态

> 分为三种状态
>
> 1. `pendding` : 挂起，也就意味着Promise对象中的异步操作还在执行！
> 2. `resolved` : 成功  意味着Promise对象中的异步操作已经完毕，并且成功了
> 3. `rejected` : 失败  意味着Promise对象中的异步操作已经完毕，但是失败了

### 使用

- 通过模拟成功或失败的情况看`resolve,reject`的使用

```js
var flag = Boolean(Math.round(Math.random()));//要么为true，要么为false，模拟成功与失败
var p = new Promise(function(resolve,reject){
  if(flag) {
    resolve();
  }else {
    reject();
  }
});
p.then(_=>{
  console.log('成功');
}).then(_=>{
  console.log('失败');
})
```

- resolve和reject都代表着回调函数，一个为成功，一个为失败
- 第一个`then`会执行resolve的函数，第二个`then`会执行reject的函数
- **模拟ajax搭配promise使用**

```js
		function ajax(url = '') {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open('get', url);
                xhr.send(null);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.state == 200) {
                        var data = xhr.responseText;
                      //将data传进成功的函数里面
                        resolve(data)
                    } else {
                        reject();
                    }
                };
            });
        }
        ajax('http://www.xxx.com').then(data => {
            console.log(data);
        }).then(_ => {
            console.log('失败');
        })
```

- 在工作中一般也不用自己去封装promise，会用第三方插件提供给你的then就行了