#	数组方法

## 判断数组的方法

```js
        var arr = [1,2,3,4,5,6,7,8,9];
        console.log(arr instanceof Array);
        console.log(Array.isArray(arr));
```

## join分割字符

```js
        var arr = [1,2,3,4,5,6,7,8,9];
		arr.join("||")//	1||2||3||4||5||6||7||8||9
        //会返回一个用||字符串分割的
```

## 插入删除操作

| push    | pop        | shift      | unshift |
| ------- | ---------- | ---------- | ------- |
| 后入,返回长度 | 后出，返回被删的元素 | 前出，返回被删的元素 | 前入，返回长度 |

- 都是对原数组进行操作。

## 重排序方法

```js
arr.reverse()	//直接对原数组进行反转
arr.sort()	//默认进行升序排序，可以传函数进行自定义排序
```

## 操作数组方法

### 连接concat

```js
var arr = [1,2];
var arr1 = [2,3];
//返回一个拼接好的新数组，不会对原数组进行更改
```

### slice

- 和字符串的slice方法一样，一个参数就是从参数位置选到结束。
- 两个参数就是从开始到结束，但不包含结束
- 和字符串一样的效果

### splice

- 有三种使用方式
  1. 删除
  2. 插入
  3. 替换

```js

		var arr = [1,2,3,4,5];
		var r = arr.splice(0,2);//删除0-2角标的元素，不包含2
				arr.splice(1,0,3);//从第一个开始，删除0个，添加一个3
				arr.splice(1,1,3);//从第一个开始，删除一个，添加一个3
         console.log(r);//返回[1,2]
         console.log(arr);//[3,4,5]
```

- 会影响原数组
- 会返回被删除的元素

### 通过元素找位置

```js
        var arr = [1,2,3,4,5];
		//在数组中找值为3的元素
		//相当于全等操作符
        var r = arr.indexOf(3);
        console.log(r);
```

- 找不到会返回 -1
- lastIndexOf() 和字符串的效果一样

## 数组遍历方法

```js
        var arr = [2,4,6,7,11,6,2,1,33];
        var every = arr.every(function(e,i,a){
            return e>10;
        })
        var some = arr.some(function(e,i,a){
            return e>10;
        })
        var filter = arr.filter(function(e,i,a){
            return e>10;
        })
        var map = arr.map(function(e,i,a){
            return e+2;
        })
        var forEach = arr.forEach(function(e,i,a){
            console.log(e);
        })
        //every相当于&&，全真才返回true。some相当于||，有一个真就返回true
        console.log(every);
        console.log(some);
		
		//返回为true的元素的数组
        console.log(filter);
		//返回被操作后的数组
        console.log(map);
```

- forEach是最常用的数组遍历方法，一般只要传一个e形参就够了，i和a没必要传
- e代表元素，i代表下标，a代表原数组

## 归并数组的方法

```js
        var r = arr.reduceRight(function(p,c,i,a){
            for(var j = 0;j<i;j++) {
                if(arr[j] > arr[j+1]) {
                    var tmp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = tmp;
                }
            }
        })
        console.log(arr);
```

- 可以逼格更高的写一些算法题
- p：prev。c：current。i：index。a：array。
- 效果类似于for，不过每次都会返回前一个和后一个运算过后的值传给下一个。
- reduce是从0角标开始遍历，加个right则是从最后开始遍历。  

