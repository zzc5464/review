# 原生jsonp具体实现

## jsonp是什么?
- 用来处理跨域问题
- 和ajax没有任何关系
- JSONP(JSON with Padding)是JSON的一种“使用模式”.
## 原理
1. 凡是拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>...
 - 比如常见的cdn
 - 实际上就是将常用的函数放到一个js文件,在当前页面末尾引用
2. json是传输数据的,并且和js代码天生合拍
 - 将json数据放到js代码中返回,便可直接使用
 - 数据不必非要是json格式
## jsonp的使用
- 先上代码：

```js

    //http://www.baidu.com?aa=11&callback=my_jsonp04349289664328899
    var jsonp = function(url,param,callback){
        //处理url地址,查找？，如果没有？这个变量就有一个"?"，有？这个变量接收一个&
        var querystring = url.indexOf("?") == -1?"?":"&";

        //处理参数{xx:xx}
        for(var k in param) {
            querystring += k + "=" + param[k] + '&';//?k=para[k]
        }

        //处理回调函数名
        var random = Math.random().toString().replace(".","");
        var cbval = "my_jsonp" + random;
        var cb = "callback="+cbval;

        querystring += cb;

        var script = document.createElement("script");
        script.src = url + querystring;

        //把回调函数的名字附给window
        window[cbval] = function(param) {
            //这里执行回调的操作，用回调来处理参数
          callback(param);
          //拿到了就删掉这个script
          document.body.removeChild(script);
        };
        document.body.appendChild(script);
    }

    jsonp(
        "https://www.baidu.com",
        {aa:11},
        function(){
            console.log(param);
        }
        );

```


## 思路：

1. 先抽象需要处理的字符串
2. 处理完url，创建一个新的script标签挂到页面上
3. 把处理好的回调函数挂到window对象上
4. 回调完再删掉script

## 步骤

1. 随便拿个地址，比如百度。
   - http://www.baidu.com?aa=11&callback=my_jsonp04349289664328899
   - 要处理的就是地址
   - 参数（?后面的内容）
   - 回调函数

```js
var jsonp = function(url,para,callback){}
```

2. 开始处理url地址
   - 域名是我们自己传进去的，所以只要处理?之后的内容就好了

```js

var queryString = url.indexOf("?") == -1?"?":"&";
//看url里面有没有?，如果有说明只要传参数就好了，没有的话queryString默认是?

//给地址传参数一般都是要好几个，所以这里的数据格式是一个对象，如{aa:11}
for(var k in para) {
  queryString += k + '=' + para[k] + '&';
  //?aa=11&
}

```

3. 处理回调函数

   - 仿jQ的思路，函数名随机，避免和页面的某个函数重名
   - 需要一个随机非浮点数
   - 参数名

   ```js
   var random = Math.random().toString().replace(".","");//随机非浮点数
   var cbvalue = "jp" + random;//不能用数字开头做函数名
   var cb = "callback=" + cbvalue;//callback = jp016548432158485
   queryString += cb;//放到处理url字符串的后面
   ```

4. 创建一个script

```js
var script = document.createElement("script");
script.src = queryString;
document.body.appendChild(script);
```

5. 把回调函数挂载到页面上，并传参

```js
window[cbvalue] = function(para){
  callback(para);
  //拿完了参数就删掉，过河拆桥
  document.body.removeChild(script);
}
```

6. 完成，尝试调用

```js
jsonp("www.jd.com",{num:10},function(){
  console.log(para);
})
```

