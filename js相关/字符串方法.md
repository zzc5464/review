# 字符串方法

## 裁切字符串方法

|            | slice        | substr       | substring       |
| ---------- | ------------ | ------------ | --------------- |
| 正值n（一个参数）  | 取n取到结束       | 同slice       | 同slice          |
| 负值-n（一个参数） | 取长度-n的位置，到结束 | 同slice       | 同slice          |
| 全正n,m（2）   | 取n->m,不包含m   | 从n开始,取m个     | 同slice          |
| 全负-n,-m（2） | 无效           | 无效           | 无效（所有负值都为0）     |
| 前正后负n,-m   | 取n->长度-m     | 无效           | 相当于n->0,取0->n的值 |
| 前负后正-n,m   | 无效           | 长度-n位置，往后取m个 | 相当于0->m         |



- substring,会将负值替换成0,并且两个参数中大的为结束位置;
- 传一个参数的时候,仨方法的效果都一样。

## 位置操作方法

| charAt | charCodeAt | indexOf  | lastIndexOf |
| ------ | ---------- | -------- | ----------- |
| 位置找字符  | 位置找字符返回编码  | 从开头字符找位置 | 从结束字符找位置    |

```js
        var str = '1测试字符串1';
        console.log(str.charAt(2));
        console.log(str.charCodeAt(2));//35797

        console.log(str.indexOf('测'));//1
        //从前往后找

        console.log(str.lastIndexOf('测'));
        //1 从后往前找，返回的是字符所在的角标
```



## trim方法

```js
        var str = "  wo shi da shuai b  "
        console.log(str.trim());//wo shi da shuai b

        //这俩还不标准，个别浏览器支持
        console.log(str.trimLeft());
        console.log(str.trimRight());
```



## 大小写转换

```js
        var str = "abcDEfg";
        console.log(str.toUpperCase());//大写
        console.log(str.toLowerCase());//小写
```



## 正则表达式配合字符串方法

```js
        var reg = /a\d/;//匹配a开头数字结尾
        var str = "12a3a4a5a";
		
//exec是正则对象提供的方法，和str对象match效果一致
//匹配成功都是返回一个数组：0表示被匹配的字符，index表示位置，input表示传入的字符串
//search返回的值相当于如上两个方法返回的index，返回一个数字
        console.log(str.match(reg));
         console.log(reg.exec(str));
		console.log(str.search(reg));
```

### rplace

```js
        var str = "aaaccccbbbb";
        console.log(str.replace("a","c"));//普通用法
        console.log(str.replace(/a/g,"c"));//配合正则使用
```

- 第一个参数可以传正则表达式
- 这个函数是字符串方法最难的

### split

```js
        var s = "aa,bb,cc,dd,ee,ff,gg,hh";
        console.log(s.split(","));
//普通用法，按照某个字符分割字符串，返回一个数组。
//console.log(str.split(/^\W\W$/));
```

- 好像没什么屌用

### localeCompare

```js
        var str = "c";
        console.log(str.localeCompare("a"));
        console.log(str.localeCompare("z"));
```

- 更没什么屌用

