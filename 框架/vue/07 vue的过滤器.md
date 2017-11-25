# fliter过滤器

## 自定义全局过滤器

- 全局的东西，都要写在实例化之前(现在好像可以下面了，不过为了保险起见还是写上面好了)


- 通过`Vue.filter()` 定义一个全局过滤器 ，接收两个参数。
  1. 过滤器的名称（用于调用）
  2. **回调函数**，里面写过滤的代码

```js
Vue.filter('myFilter',filterStr=>{});
```

### 实例

- 替换数据的某个字符串

```js
		//注册全局过滤器
		Vue.filter('myFilter', filterStr => {
          //3. 做字符串操作
            return filterStr.replace("优秀", "聪明");
        })
		//1. 实例化
        var vm = new Vue({
            el: '#app',
            data: {
              //2. 给个数据
                msg: "像我这么优秀的人"
            },
            methods: {}
        })
```

- 调用

```html
    <div id='app'>
      <!--数据 | 过滤器名字 -->
        {{msg | myFilter}}
    </div>
```

- `|` 叫做管道符，以**数据 | 过滤器** 的形式来调用
- 过滤器回调的第一个参数默认是 `|` 最左边的名字

#### 需要传多个参数怎么办？

```js
Vue.filter('myFt',(ftStr,b,c)=>{
  //传入多个参数
  return ftStr.toString() + b + c;
})
```

- 调用

```html
    <div id='app'>
      <!--数据 | 过滤器名字(参数2,参数3) -->
        {{msg | myFt(1,2)}}
    </div>
```

- 数据仍然是参数1
- 剩下的参数通过过滤器名称（）调用

### 调用多个过滤器

```js
//过滤器1
Vue.filter('myFt1',(ftStr,b,c)=>{
  //
  return ftStr.toString() + b + c;
})
//过滤器2
Vue.filter('myFt2',ftStr =>{
  //传入多个参数
  return ftStr + '我是老二'
})
```

-  调用
  - 通过`|` 一直往后调用就行了
  - 如果第二个过滤器有多个参数和之前一样通过`()` 调用

```html
    <div id='app'>
        {{msg | myFt1(1,2) | myFt2 }}
    </div>
```

### 使用时间处理插件 comment

- 下载  `npm i comment -S`
- `<script src="./node_modules/moment/moment.js"></script>`
-  使用 `moment(val).formar(时间格式)`

```js
        Vue.filter('time', formatStr => {

            return moment(formatStr).format('YYYY-MM-DD hh:mm:ss')
        })
        var vm = new Vue({
            el: '#app',
            data: {
                msg: new Date()
            },
            methods: {}
        })
```



## 自定义私有过滤器

- 通过给实例添加参数`filters` 添加私有过滤器
- 可以给多个

```js
        var vm = new Vue({
            el: '#app',
            data: {
                msg: "像我这么优秀的人"
            },
            methods: {},
          //私有过滤器
            filters: {
              //也是函数
                outFt(str) {
                    return str + '=====> OK'
                }
            }
        })
```

- 调用的方式和全局是一样的
- 但是只有定义了过滤器的那个实例能用