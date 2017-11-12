# 高阶技巧

## 面试答题思路

- 先讲作用域，引出闭包，再解释内存泄漏问题。
- 再讲讲应用场景

## 作用域

- 外层的函数无法调用里层的函数
- 里层的函数可以调用外层的函数
- 函数之间无法拿到各自内部定义的变量/函数，进行使用。

```
比尔盖茨很多钱，都是他的私有财产。
别人都不能用。
那非要用他的钱呢。
去泡他女儿，让他女儿去拿他钱给你用。
```

## 闭包

- 一个函数能够调用另一个函数内部的变量就是闭包

```js
    function outer(){
        var num = 1;
        function inner(){
            console.log(++num);
        }
        return inner;
    }
    var tmp = outer();
    tmp();
```

## 垃圾回收机制

### 引用计数

- js使用引用计数来表示内存的调用


- 当一块内存被引用，则计数+1
- 当计数为0的时候这片内存就会自动释放。

```js
    //这个对象被变量obj接收，则引用计数+1
        var obj = {
            name:'zs',
            age:18
        }
    //引用计数再+1，为2
        var obj2 = obj;

    //obj释放了对对象的引用，计数-1
    //但是obj2仍然还在引用，所以不会释放内存
        obj = null;

    //真正的释放内存，没有再对这个对象进行引用
        obj2 = null;

```

## 应用场景

- settimeOut中传入一个自调用函数，形成闭包

### 闭包经典面试题

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
<script>

  //1. 打印下标
  //2. 使用settimeout打印1，2，3，4，5，6，7


  //1.方法1：
  //  var lis = document.querySelectorAll("li");
  //  for(var i = 0; i < lis.length; i++) {
  //    lis[i].index =i;
  //    lis[i].onclick = function () {
  //      console.log(this.index);
  //    }
  //  }


  //2.方法1：
  //  var lis = document.querySelectorAll("li");
  //  //let是es6，支持块级作用域
  //  for(let i = 0; i < lis.length; i++) {
  //    lis[i].index =i;
  //    lis[i].onclick = function () {
  //      console.log(this.index);
  //    }
  //  }


  //3. 使用forEach
  //    var lis = document.querySelectorAll("li");
  //    //let是es6，支持块级作用域
  //    lis.forEach(function (e, i) {
  //      lis[i].onclick = function () {
  //        console.log(i);
  //      }
  //    })


  //4. 使用闭包
//  var lis = document.querySelectorAll("li");
//  for (var i = 0; i < lis.length; i++) {
//    (function (i) {
//      lis[i].onclick = function () {
//        console.log(i);
//      }
//    })(i);
//  }

  //5. 使用闭包
//  var lis = document.querySelectorAll("li");
  //  for (var i = 0; i < lis.length; i++) {
  //    lis[i].onclick = (function (i) {
  //      return function () {
  //        console.log(i);
  //      }
  //    })(i);
  //  }



  //  for(var i = 0; i < 10; i++){
  //      setTimeout((function (i) {
  //        return function(){
  //          console.log(i);
  //        }
  //      })(i), i * 1000);
  //  }
</script>

</body>
</html>
```

