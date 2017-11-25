# Vue的路由

## 路由是什么？

> 根据不同的url地址，返回不同的内容
>
> Vue官方提供了路由插件，可以方便的实现路由功能

## Vue-router

> vue中的路由效果，通过不同的hash值，展示不同的组件

- 安装

`npm i vue-router -S`

- 引入

`<script src="./node_modules/vue-router/dist/vue-router.js"></script>`

> 基于vue，必须写在vue文件的后面

## 路由使用的步骤

1. 创建组件的对象

```js
//路由中定义组件，通过对象的写法
		var login = {
            template: '<h1>我是login</h1>'
        }
        var register = {
            template: '<h1>我是register</h1>'
        }
```

2. 通过VueRouter对象将路由和地址一一对应
   - 通过RouterVue对象中的routes属性，是一个数组
   - 数组中的每个对象有`path`指定路由 和 `component `指定组件


```js
var router = new VueRouter({
  router:[
    {
      path:'/login',
      component:login//外面定义的组件
    },
    {
      path:'/register',
      component:register
    }
    //可以注册多个
  ]
})
```

3. 在vue实例中关联router对象

```js
var vm = new Vue({
  router,//router属性绑定router对象，es6可简写
  el:'#app',
  data:{}
})
```

4. 给路由匹配的组件，指定显示的页面位置

```html
    <div id='app'>
        <router-view></router-view>
    </div>
```

## 路由的参数

### 通过`?key=value`传参的形式

- 就是 `vue-router.html#/login?id=19` 中 `#/login` 后面的内容就是路由的参数
- 通过`?k=v`形式的传参可以通过`this.$route.query`拿到键值对

```js
var login = {
  template:'#login',
  created(){
    //假如传的是#/login?id=1
    console.log(this.$route.query)//{id:1}
  }
}
```

### 动态路由

- 不使用键值对形式传参，而是直接写`#/login/xxx`如何设置路由？
- 在配置路由的时候，给path路径后面加上:xxx的形式，相当于参数名
- 这样设置的路由叫做动态路由，可以通过this.$route.params获取

```js
var router = new VueRouter({
  routes:[
    //就是给路径后面加了一个:,参数名随意指定
    //这里指定为id，那么this.$route.params获取的也是id
    path:'/login:id'
  ]
})
```

> 这样写的话，页面的url地址就要写成`#/login/1` ，这种/后面直接带值的类型
>
> this.$route.params获取的时候,结果为`{id:1}`
>
> 如果不写后面的参数，页面会显示不出来。那么可以再给id后面加一个`?` ，表示这个参数不一定要传

```js
path:'/login:id?'
```

## 路由的重定向

- 想要从`/` 路由，跳转到`/index` ，要使用VueRouter对象中的`redirect` 属性

```js
var router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home'
    }
  ]
})
```



## 路由的嵌套

> 比如一个用户组件，里面包含了登录和注册。但它们肯定不是同时显示，而是有账号就登录，没账号要注册。
>
> 那么路由就要这么写 `#/user/login` 

#### 做法

- 配置路由里面还有一个参数`children` , 可以通过它配置路由的子路由

```js
var router = new VueRouter({
  routes:[
    path:'/user',
    component:user,
    children:[
    	{
    		path:'login',
    		component:login
    	}
  	]
  ]
})
```

>  在children里面设置的子路由不要加`/` ，直接写名字就行
>
>  浏览器的地址:`vue-router.html#/user/login` 



## watch 监听数据

> vue实例中的又一个属性`watch` ，可以监听数据的变化。但是只能看，并不能阻止它做的操作。
>
> msg用于监听数据
>
> 用于监听对象，监听也要写成对象
>
> `handler`就是监听对象的函数
>
> `deep`表示深层次监听，不是true的话无法监听对象
>
> `immediate`表示立即开始监听

```js
var vm = new Vue({
            el: '#app',
            data: {
                msg: '100'
            },
            methods: {},
            watch: {
                msg(nv, ov) {
                    console.log("监听数据");
                },
                person: {
                    handler(nv, ov) {
                        console.log('监听对象');
                    },
                    deep: true,
                    immediate: true
                }
            }
        })
```

### wacth监听路由的变化

- 其实就是在路由的`created`钩子函数里绑定组件的某个数据
- 通过wacth监听路由的改变，改变的时候讲路由的参数赋值给被绑定的数据

```js
 var home = {
            template: '<h1>这是home,id是{{id}}</h1>',
            data() {
                return {
                    id: 0
                }
            },
            created() {
                this.id = this.$route.params.id
            },
            watch: {
                $route(nv, ov) {
                    // 绑定路由的参数和自己本身的id数据
                    this.id = this.$route.params.id
                }
            }
        }
```

### 实际运用demo

- 在vue实例中也可以直接wacth `$route`的变化
- 那就可以通过this.$route.path来判断当前路由地址
- 并配合判断是否为管理员，选择让不让他进入后台管理页面

```js
        var vm = new Vue({
            router,
            el: '#app',
            data: {

            },
            methods: {},
            watch: {
                $route(nv, ov) {
                  //有管理权限的
                    var hasRoot = true;
                    var path = this.$route.path;
                    if (hasRoot && path.startsWith('/home')) {
                        console.log('请进');
                    } else {
                        console.log('滚粗');
                    }
                }
            }
        })
```

## 路由的钩子函数（了解）

> 官网叫做：路由守卫    --------------> exm???(黑人问号脸)
>
> 其实就是路由跳转之前，会触发相对应的钩子函数

### 全局的钩子

- 官网例子

```js
var router = new VueRouter({
  
})
router.beforeEach((to, from, next) => {
  // ...
})
```

- 全局的就是页面中所有路由，只要一跳转就会触发
- 很少用到











