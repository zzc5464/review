## 1. 以下哪些是原始值

```js
a. 1
b. null
c. '3'
d. [1]
```

## 2. 二分法

`arr=[13,18,24,35,47,50,63,83,90,115,124];` 找到90要找几次

- 2次

```js
    function binarySeach( arr,val,leftIndex,rightIndex ){
    // 2. 找到数组长度的中间的值
    var midIndex = Math.floor((leftIndex+rightIndex)/2);//5 8
    var midval=arr[midIndex];//50 90
    console.log(midval );
    if( leftIndex > rightIndex ){
        // console.log("前一位是",midval );
        // console.log("下标：",midIndex);
        //
        return ;
    }
    if( midval > val ){
        binarySeach(arr,val,leftIndex,midIndex-1);
    }else if(midval < val){
        binarySeach(arr,val,midIndex+1,rightIndex);
    }else{
        console.log("找到了,下标为:"+midIndex);
        return;
    }
}
//1. 首先，数组必须是递增的
var arr=[13,18,24,35,47,50,63,83,90,115,124];//11
binarySeach(arr,90,0,arr.length-1);
// 原数组，要找的值，从哪边找，找到哪里
```

> 原理：
>
> 1. 首先，数组必须是递增的。
> 2. 先找中间的值，判断中间值和你要找的值谁大
> 3. 中间值大，就从中间值的下标和开头这一段的数组继续找，继续截一半
> 4. 小就从这个中间值的下标和最后的角标这段数组找，然后继续截一半
> 5. 直到找到，或者下标大于了数组长度为止

## 3. 不是解决异步的东西是？

> a. Promise
>
> b. Generator
>
> c. async
>
> d. Proxy

```
Generator可以让你“暂停”一个函数（而不暂停整个程序），它也能你从上至下写异步函数，但是代价是代码有点复杂难以理解。wat就是使用这个方法。
Promise就是一种让你从上至下写回调函数的方法，它鼓励你使用try/catch处理更多类型的错误
Async functions是ES7的特性，是生成器和promise更高级的封装，有兴趣自己谷歌一下呗。
所以选 D 
```

## 4. `border-collapse`

> 是CSS2的东西 将表格合并的属性