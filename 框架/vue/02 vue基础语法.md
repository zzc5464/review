# vue基础语法

## 基本安装

### [直接用引入](https://cn.vuejs.org/v2/guide/installation.html#直接用-lt-script-gt-引入)

```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

###  开发大型应用

- vue-cli

```bash
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```



## 绑定信息

- Mustache(双大括号包裹)------>`{{}}`
- v-html
- v-text

> 三种的区别:

```html
//插值表达式可以在文字的任意部分插入，不会覆盖原来的内容
<div>我依然存在:{{msg}}</div>

//v-text中的文字会覆盖标签原来的内容
<div v-text="msg">我会被覆盖</div>

//v-html
//就是可以解析html代码咯
```

## 插值表达式闪烁问题

#### v-cloak

- 浏览器会先解析原本的内容，当网络请求不好的时候插值表达式还没有被vue解析。
- 甚至刷新快一点都会暴露

```html
<div id="app">
        <div>{{msg}}</div>
</div>
//在页面中会直接显示   {{msg}}
```

- 解决办法
- 可以给元素加上`v-cloak`指令，配合css样式来解决闪烁问题

```html
    <style>
        [v-cloak]{
            display: none;
        }
    </style>
	<div id="app">
        <div v-cloak>{{msg}}</div>
    </div>
```

>  原理： 在vue.js加载完毕之前，由于元素有v-cloak指令的存在，css样式生效，将元素隐藏起来，
>
>  当vue.js加载完毕，会自动将所有元素上的v-cloak指令移除，那么css样式失效，元素就展示出来。
>
>  但是这个时候插值表达式已经被解析完毕了！

##绑定属性

- v-bind:id

> 所有属性都通过v-bind绑定
>
> 简写 ： `:+属性名` 
>
> `v-bind='class'`  ==> `:class` 

```html

<div id="app">
        <img v-bind:src="picUrl" alt="">

        <img :src="picUrl" alt="">
</div>

 <script>
        //在给元素的属性进行数据绑定的时候，插值表达式不可以使用
        //需要使用v-bind指令或者其简写形式 : 来进行绑定
        var vm = new Vue({
            el: "#app",
            data: {
                picUrl: "1.jpg"
            }
        })
</script>
```

- 给**元素的属性**绑定动态数据的时候一定要用`v-bind`

1. 表达式

{{id==1?"ok":"else"}}

> 基本的{{}}形式都可以写一些简单的表达式
>
> 不能写语句或者if，for

4. 效果指令
> 控制显示隐藏
   - v-if
```html
<body>
    <div id="app">
     <!--
	直接写true或者false，不会去找data里面的值，会直接表示
	true：显示，false：隐藏	
--> 
        <p v-if='true'>我会出现</p>
        <p v-if='false'>我会隐藏</p>
    <!--如果绑定的是某个变量，在model中值为true则显示，不写或者false为隐藏-->  
        <p v-if='seen'>我是什么</p>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                seen: true
            }
        })
    </script>
</body>
```
> v-if的元素，不是通过css来这是隐藏，而是直接不渲染。
>
> 如果某个元素v-if为false，那么这个元素身上的其他指令都会失效，因为根本不渲染
>
> 切换为true时会重新渲染指令，所以消耗的性能很大，最好绑定在渲染频率低的元素上
   - v-show

> v-show的语法和v-if一样，不同的是，show只是隐藏了元素。
>
> 所以绑定切换显示隐藏较多的元素最好绑定v-show

## 绑定类名

```css
<style>
/*demo样式如下*/
        .red {
            background-color: red;
        }
        
        .big {
            font-size: 30px;
        }
        
        .green {
            background-color: green;
        }
</style>
```

1. 字符串绑定法

> 就相当于字符串拼接
>
> obj里面写什么，p标签的类就是什么

```js
	<div id="app">
        <p :class='obj'>我的样式啊</p>
    </div>
var vm = new Vue({
            el: '#app',
            data: {
              obj: "red big"
            }
        })
```

2. 对象绑定方法**最常用**

> 不同于以往的对象，这里的**键名就代表要传的类名**
>
> true和false只是代表**要不要传**而已

```html
	<div id="app">
        <p :class='obj'>我的样式啊</p>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
              obj: {
                red:true,
                big:true
              }
            }
        })
	</script>
```

3. 数组语法

```js
obj: ['red', 'height']
//其实就是字符串的做法
```

4. 混合型

```js
obj:[{red:true},'big']
//偶尔用用
```



## 绑定内联style

1. 对象表示法

> 这里的键名代表的也是属性名，值代表的是属性的值

```html
<div id="box">
        <p :style='obj'>vue</p>
</div>
<script>
        var vm = new Vue({
            el: '#box',
            data: {
                obj: {
                    color: 'red',
                  	width:'100px'
                }
            }
        })
</script>
```

2. 数组表示法

> 在里面写一个数组，包含对象，对象里面包含的属性都会解析

```html
<div id="box">
        <p :style='obj'>vue</p>
</div>
<script>
        var vm = new Vue({
            el: '#box',
            data: {
              objArr:[
                {
                	height:'100px'
              	},{
                    color: 'red',
                  	width:'100px'
                },
              ]
            }
        })
</script>
```

## 条件渲染

```powershell
# html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
# js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

## 事件绑定

- 用v-on:事件声明，里面的值就是事件触发会调用的函数
- 函数要在`methods`中定义

```
# html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">变成数组</button>
</div>
#js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello 我的哥'
  },
  methods: {
  //es6写法，省略function
    reverseMessage:  () {
      this.message = this.message.split('');
    }
  }
})
```

> 简写:  `v-on:click` ----> `@click`

### 事件绑定的修饰符

- 就是在事件绑定后面再.xxx会有添加一些效果（取消冒泡等）
- 可以不断的`.` 来连写

```html
<button v-on:click.stop.prevent="reverseMessage">逆转消息</button>
<!-- stop是取消冒泡  prevent取消默认事件 -->
<button v-on:click.once="reverseMessage">逆转消息</button>
<!-- once代表这个按钮只能点击一次 -->
        //.stop    用来阻止事件冒泡的！
        //.prevent 用来阻止浏览器默认行为
        //.capture 用来将事件设置为捕获阶段触发
        //.self    只有元素本身能够触发该事件  事件冒泡等行为无法触发
        //.once    事件只会被触发一次
```

## 计算属性computed

> 效果其实和methods一样，都是定义函数的
>
> 这个主要是用来放一些用于计算后返回结果的方法
>
> 本质就是将行为再抽取出一个分类，`methods`里面的方法，主要用来做功能。`computed`主要用来做计算，返回一个结果。
>
> **不需要去调用**，绑定好了页面的元素，会自动触发。

```js
//在html中直接加方法名就行了  <span>{{result}}</span>

	var vm = new Vue({
            el: "#app",
            data: {
                num1: 0,
                num2: 0,
            },
            computed: {
                result: function(){
                    console.log("computed被调用了")
                    return parseInt(this.num1) + parseInt(this.num2);
                }
            }
        })
```

- 默认的计算属性是单项绑定的
- 有缓存，多次调用相同结果只会返回第一次的结果。相比于methods每次调用都要全部执行一次，效率更高。
- 在页面中不需要写 （）来调用

#### 计算属性实现双向数据绑定

> 当计算属性只有一个函数的时候，这个函数默认是get
>
> 两个函数，一个是get，一个是set

```js
computed: {
    // 如果计算属性只是一个函数，那么这个函数就是get函数
    // fullName: function(){
    // },
    //如果要使用计算属性进行双向数据绑定，那么就必须用下面的形式
    //为计算属性设置get和set方法！
    fullName: {
      //当取值的时候，是num1+num2
        get: function(){
            return this.num1 +  this.num2
        },
       //当设置这个值得时候，num1、num2的值会更着改变
        set: function(value){
            this.num1 = value-this.num2;
         	this.num2 = value-this.num1;
        }
    }
}
```

- `computed` 用的最多的还是单项的，毕竟计算出来只要结果。

## 双向数据绑定

**v-model**

> 1. 单向数据绑定 （一般用在展示性标签）
>
> 数据改变--->元素内容会改变。
>
> 元素内容改变--->数据内容不会改变
>
> 2. 双向数据绑定 （一般用在表单元素中）
>
> 数据和展示元素，更改任意一方，会对双方都造成影响

```
<body>
    <div id="app">
        <input type="text" v-model="msg">
        <span>{{msg}}</span>

        <input type="text" v-model="person.name">
        <input type="text" v-model="person.age">
        <input type="text" v-model="person.gender">
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                msg: "123",
                person: {
                    name: "zzc",
                    age: 18,
                    gender: "!male"
                }
            }
        })
    </script>
</body>
```

## v-for指令

1. 如果是遍历对象

> 对象有三个可以遍历出来的
>
> item key index
>
> 因为对象有键值对，并且vue将对象模拟了一个顺序
>
> 对象本身是无序的

```html
<ul id='app'>
        <li v-for='(item ,key, index) in person' :key='index'>
            值 ： {{item}} ==> 键 ： {{key}} ==>顺序 ： {{index}}
        </li>
</ul>

	var vm = new Vue({
            el: "#app",
            data: {
                person: {
                    name: "张志潮",
                    age: 19,
                    gender: "male"
                }
            }
	})
```

2. 如果是遍历数组

> 数组没有第三个值，只有item和index
>
> 因为数组本身是有序键值对

```html
    <ul id='app'>
        <li v-for='(item , index) in person'>
            内容 ： {{item}} ==> 下标 ： {{index}}
        </li>
    </ul>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                courses: [
                    "瑜伽",
                    "啦啦操",
                    "广场舞",
                    "肚皮舞",
                    "美甲"
                ]
            }
        })
    </script>
```

