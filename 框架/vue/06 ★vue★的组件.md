# vue的组件

## 定义全局组件的三种方式

> tips: 组件的定义一定要在实例化vue之前
>
> 组件只能在被vue实例管辖的元素中使用
>
> 全局组件可以在任意实例中引用
>
> 组件不要用驼峰命名法，最好用`-`

### 第一种（不常用）

- 通过`Vue.extend()` 和 `Vue.component()` 搭配

```js
var temp = Vue.extend({//定义好组件用一个变量接收一下
  template:'<h1>组件结构</h1>'
});
Vue.component('myh1',temp);
//Vue.component(自定义组件名,接收组件的变量名)
```

- 在html中引入
  - 写一个组件名的标签

```html
<myh1><myh1/>
```

### 第二种

```js
Vue.component('mytool',{
  template:'<h1>我的第二个组件</h1>'
})
```

- 直接通过Vue.component()定义组件
- 调用

```html
<mytool></mytool>
```

### 第三种

- 和第二种基本一致，区别就是可以引入一个外部的html
- 这种最常用

```js
Vue.component('temp',{
  template:'#tml'
})
```

1. 通过`Vue.component()`注册一个组件
2. 将template的参数指定为一个选择器
3. 定义一个script标签，类型指定为**非脚本**就可以

```html
	<script id="temp" type='x-template'>
        <div>
            <p>我是第三个组件</p>
            <a href="#">链接</a>
        </div>
    </script>
```

4. 指定的id要和template指定的选择器对应上
5. 调用

```html
<temp></temp>
```

### 注意事项

1. 一个组件只能有一个根元素
2. 如果需要换行最好使用ES6的模板字符串 ``

### 在组件中使用数据

> 在组件的参数中添加一个data参数，这个参数必须是一个函数
>
> 函数中return一个对象，所有的数据都放在这个对象里
>
> 在html模板中用`{{}}` 调用即可

```js
Vue.component('mydiv', {
            template: `
            <div>
              <p>你是一条大傻狗</p>
              <p>爱吃{{msg}}</p>
            </div>
            `,
            data() {
                return {
                    msg: '小槟榔'
                }
            }
        })
```

- 使用第三种选择器的方法也一样的，定义好数据，直接往script标签里面模板加`{{}}` 即可

### 为什么组件的data是一个函数

1. 因为组件是可以调用多次的
2. 如果data是一个对象，那么一个组件改了里面的数据，则影响到所有的组件
3. 用函数来返回一个对象，每个对象都是独立的，互不影响
4. 用对象vue会报错

### 在组件中定义方法

>通过methods定义，还是一个**对象**

```js
		Vue.component('temp', {
            template: '#temp',
            data() {
                return {
                    msg: '玛莎拉蒂'
                }
            },
            methods: {
                say() {
                    alert(this.msg)
                }
            }
        })
```

- 在定义组件的模板中调用`say()` ，alert一个玛莎拉蒂。

```html
	<script id="temp" type='x-template'>
        <div>
            <p @click='say'>我是第三个组件</p>
            <a href="#">{{msg}}</a>
        </div>
    </script>
```

## 定义私有（子）组件

> 通过`components` 定义实例的私有组件，注意有个s，表示可以定义多个组件。

```js
var vm = new Vue({
    el: '#demo1',
    components: {//通过components定义私有组件
        'login': {//键名就是组件名
          //剩下的和定义全局组件一毛一样
            template: '<div>我是私{{msg}}有的</div>',
            data() {
                return {
                    msg: 'demo1'
                }
            },
            methods: {
                say() {
                    console.log(this.msg)
                }
            }
        }
    }
});
var vm2 = new Vue({
    el: '#demo2'
})
```

- 调用

```html
<!--在demo1中生效-->
<div id="demo1">
    <login></login>
</div>
<!--无效-->
<div id="demo2">
    <login></login>
</div>
```

## 切换组件

> vue提供了`<component :is=""></component>`来实现组件之前的切换。
>
> 效果就是，进行点击（或者其他触发事件）的时候切换不同的组件

1. 定义两个全局组件,以及初始化vue

```js
// 1. 准备两个组件，一个登录，一个注册
Vue.component('login', {
    template: `
    <h3>我是登录</h3>
  `
})
Vue.component('register', {
    template: `
    <h3>我是注册</h3>
  `
})
```

2. 在vue管理的组件中使用`<component :is=""></component>`
   - :is中接收一个组件名字的字符串
   - 写的是谁就显示谁，如果要切换就写变量

```html
 <div id='app'>
     <!-- 2. 准备一个component标签，vue提供的，
     <component :is='changeName'></component>
 </div>
```

3. 在数据中提供一个切换的变量，默认为login

```js
var vm = new Vue({
    el: '#app',
    data: {
        //3. 将conponent的 is属性写成动态的数据
        //再给俩a点击的时候切换里面的字符串就实现切换了
        changeName: 'login'
    },
    methods: {}
})
```

4. 给两个a加点击，切换字符串

```html
<div id='app'>
    <!-- 4. 注册点击事件，改变data里面的changeName -->
    <a href="#" @click.prevent='changeName="login"'>登录</a> | 
    <a href="#" @click.prevent='changeName="register"'>注册</a>
    <!-- 2. 准备一个component标签，vue提供的，用来切换组件 -->
    <component :is='changeName'></component>
</div>
```

