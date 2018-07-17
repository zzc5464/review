# Vue的路由

## 路由是什么？

> 根据不同的url地址，返回不同的内容
>
> Vue官方提供了路由插件，可以方便的实现路由功能

## Vue-router

> vue中的路由效果，通过不同的hash值，展示不同的组件



- 安装(基于webpack单页面文件时引入)

`npm i vue-router -S`

- 普通项目中引入

`<script src='https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js'></script>`

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
   - 数组中的每个对象由`path`指定路由 和 `component `指定组件


```js
var router = new VueRouter({
  routes:[
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

> 工作中常见的需求,根据不同的地址栏参数，在同一个页面渲染对应参数的数据。
>
> 单页面应用是不进行页面跳转的,所以就模拟出来键值对传参的形式。
>
> 如 :  `router.html#/a?id=19` 中 `#/login` 后面的内容就是路由的参数

```html
<!-- 比如这个id是在一个列表中循环出来的,通过每一个不同的id去查看详情 -->
<!-- 点击之后地址变成了router.html#/a?id=1 -->
<router-link :to="/a?id=1">a</router-link>
<!-- 点击按钮可以看到当前的id -->
<button @click='showDetail'>显示id</button>

<!-- data:{id:1} -->
```

- 通过`?k=v`形式的传参可以通过`this.$route.query`拿到键值对

```js
var detail = {
  template:'#app',
  methods:{
    showDetail(){
    	console.log(this.$route.query)//{id:1}
    }
  }
}
```

> 总的来说，跟以前写个方法获取地址栏参数一毛一样
>
> 就是能够拿到地址栏?xx=xx&xx=xx后面的值

### 动态路由

- 不使用键值对形式传参，而是直接写`#/login/xxx`如何设置路由？
- 在配置路由的时候，给path路径后面加上`:name`的形式，相当于参数名
- 这样设置的路由叫做动态路由，可以通过this.$route.params获取

```js
var router = new VueRouter({
  routes:[
    //就是给路径后面加了一个:,参数名随意指定
    //这里指定为id，那么this.$route.params获取的也是id
    path:'/a:id'
  ]
})
```

> 这样写的话，页面的url地址就要写成`#/a/1` ，这种/后面直接带值的类型
>
> this.$route.params获取的时候,结果为`{id:1}`
>
> 如果不写后面的参数，页面会显示不出来。那么可以再给id后面加一个`?` ，表示这个参数不一定要传

```js
path:'/login:id?'
```
> 同一个路由，通过参数切换，当前路由的组件会被复用。
>
> 提升性能，但是**组件的生命周期钩子不会再被调用**
>
> 那么就要用到下面的方法。

## watch 监听数据

#### 监听路由

> 路由的配置参数 `watch` 和 `beforeRouteUpdate` 

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // from 路由 从哪来
      // to 路由 到哪去
    }
  }
}
```

#### `beforeRouteUpdate` 

```js
// vue@2.2 以上 可用
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

## vue实例中的watch

> `vue`实例中的又一个属性`watch` ，可以监听数据的变化
>
> `msg`用于监听数据
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
                msg: '100',
                person:{
                  one:1,
                  two:2
                }
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


## 路由的嵌套

> 比如一个用户组件，里面包含了登录和注册。但它们肯定不是同时显示。
>
> 用户未注册时路由的情况  `#/user/register` 
>
> 用户已注册时路由的情况  `#/user/login` 

#### 路由`children` 参数的使用

- 配置路由里面还有一个参数`children` , 可以通过它配置路由的子路由

```html
<div id="app">
  <!-- user组件会通过路由渲染在这里 -->
  <router-view></router-view>
</div>
```



```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
		// user的子路由会渲染在这里
      <router-view></router-view>
    </div>
  `
}

var router = new VueRouter({
  routes:[
    path:'/user',
    component:user,
    children:[
    	{
    		path:'login',
    		component:login
    	},
    	{
			path:'register',
    		component:Register
    	}
  	]
  ]
})
```

>  在children里面设置的子路由不要加`/` ，直接写名字就行
>
>  浏览器的地址:`vue-router.html#/user/login` 
>
>  注意不要和路由的参数搞混了，两个概念是不一样的。

## 编程式导航

#### router.push()

> 想通过代码而不是`a/routerLink`来跳转，可以使用`this.$router` 在`vue`内部访问路由的实例。
>
> 使用`this.$router.push('demo')` 等同于 `<router-link to="/demo">`

```js
// 下面两种写法都会跳到home路由
router.push('home')
this.$router.push({
   path:'home',
})
// 下面这种写法，会忽略params
this.$router.push({
	path:'home',
  	params:{
    id : 13
  }
})
// 命名的路由   <router-link to="/demo/123">
router.push({ name: 'demo', params: { userId: 123 }})
this.$router.push({
        name:'demo',
        params:{
            id : 13,
            name : 'zs'
     	}
})；
    // this.$router.push('home')
// 带查询参数，变成  <router-link to="/demo?name=zs">
router.push({ path: 'demo', query: { name: 'zs' }})
```

> 关于为什么使用了path就会使`params`失效的思考 : 
>
> 很简单，所谓的`params`写法不就是`a/b/c/d` 所以直接写`path :'a/b/c/d' ` ，再写个params来匹配显得非常多余。
>
> 但是命名路由又不一样了，它相当于路由地址的一个变量，所以要加`params`来确保路由跳对了。

#### router.replace()

> 跟`router.push` 方法的效果一模一样，但是不会将路由地址添加到历史记录里面，而是会替换跳转的地址。

#### router.go()

> 传一个正/负整数，效果是跳转历史记录多少页。
>
> 如果超过了记录，会自动失效不会报错。


## 命名路由与`router-link`

> 1. 当路由的路径嵌套很多层的时候，可以指定一个`name`带代替这条路径
> 2. 配合`<router-link :to='home'>home</router-link>`

```js
        var router = new VueRouter({
            routes: [{
                name: "home",
                path: "/home/asdf/adsf/asdf/asdf/asdf/asdf/asdf/asdf/asdf/asdf",
                component: {
                    template: '<h1>home组件</h1>'
                }
            }]
        })
```

### 不使用name

> 不使用name，而是直接写路由的地址的时候`<router-link to='/home'>home</router-link>`
>
> 里面的to不用加`:` 直接写`/地址名` 

### 使用场景

> 1. 是有`router-link` 而不去使用a有一个好处，就是切换的时候，会自动给你带上一个`router-link-active` 的类，**给这个类加一些样式**，可以很快的实现**导航切换**的效果
> 2. 移动端有header的需求，SPA的话只会在app根组件写一个header，使用命名路由就可以动态的绑定上面的文字。

### 小结 

1. 命名路由可以设置给需要频繁修改路径，或者嵌套非常深的路由，更改一次名称即可，易于维护。
2. 匿名路由`<router-link>` 的`to`属性不用加`:` ，命名路由的要。


## 命名视图

> 一个路由进去展示多个`router-view`
>
> 通过 `router-view` 的name属性指定展示的组件

```html
<!-- 不写就匹配到default中  -->
<router-view class="default"></router-view>
<router-view class="viewA" name="a"></router-view>
<router-view class="viewB" name="b"></router-view>
```

- 路由的配置

```js
let componentA = {
  template:`<p>a</p>`
}
let componentB = {
  template:`<p>b</p>`
}
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: componentA,
        b: componentB
      }
    }
  ]
})
```

- 命名视图+嵌套路由

> 就是在一个页面中要展示多个视图，并且这些视图还有判断要展示他们的子路由
>
> 官网的例子 : 

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```



```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,   // 他会匹配到 router-view
      helper: UserProfilePreview // 他会匹配到<router-view name="helper"/>
    }
  }]
}
```

## 路由的重定向

- 想要从`/` 路由，跳转到`/index` ，要使用VueRouter对象中的`redirect` 属性

```js
var router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home' // 直接跳转到某路由要加 /
      // 使用命名路由的方式
      // redirect:{
      // 	name : 'home'
      // } 
    },
    { 
      path: '/a', 
      // 使用一个方法重定向
      redirect: to => {
      // 方法接收 目标路由 作为参数
      // 通过一顿操作，最后将结果return出去
      return   // 重定向的 字符串路径 或 路径对象
    }
  ]
})
```

### 别名 `alias`

> 感觉没啥用。。
>
> 重定向的意思，就是你要去a，安排你去b。
>
> 浏览器的hash也会从a变成b
>
> 别名就是浏览器的hash看起来是a，但是渲染的路由规则是b。
>
> 『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

## 路由组件传参

> 一些组件需要通过地址栏参数作为条件渲染，那么封装好之后用到没有参数的路由时就崩了。
>
> 为了解耦合，可以通过路由的`prop` 属性

### 布尔模式 

- 设置props为`true or false`


- 设置后`rooute.params`就变成了组件`data`中的属性

```js
const User = {
  props: ['id'],  // 它就相当于当前路由的参数了
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { 
      path: '/user/:id',
      props: true  , // 表示使用props来接收地址栏参数
      component: User, 
    }
  ]
})
```

### 对象模式

- 用于命名视图

```js
const User = {
  props: ['id'],  // 它就相当于当前路由的参数了
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    // 对于包含命名视图的路由，你必须分别为 每个命名视图指定props为true / false
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { 
        default: true,  // 给 :id
        sidebar: false  // 不给 :id
      } 
    }
  ]
})
```

### 函数模式

> 以函数的形式运算，返回一个结果
>
> 官网的例子太简单，下次自己写一遍。

## HTML5 History 模式

> 要后台支持你才能开
>
> 开了地址栏就变成`http://abc.com/a/b` 不会有一大串哈希
>
> 记这个只是为了让你看到`mode: 'history'` 不用太好奇

```js
 const router = new VueRouter({
  mode: 'history',
  routes: []
})
```

## 导航守卫

> **导航**表示路由正在发生改变。
>
> 也就是说，路由地址一改变就会触发这个回调。
>
> 注意 ：路由的参数改变不会触发这个函数，如果想要监听参数的改变应该用`watch` 去监听`$route`

- 使用 `router.beforeEach` 注册一个全局前置守卫,项目实例

```js
Router.beforeEach((to, from, next) => {

    //禁止通过后退键离开 
    if(_.isNull(to.name) && to.path == '/'){
        next({path:'/'});
        return ;
    }
  
  	// 以下为重点
    //进入登陆页
    if(to.path == '/login'){
        if(Util.loginCheck()){
            next({path:'/'});
            return ;
        }
        next();
        return ;
    }

    //登录验证
    if(!Util.loginCheck()){
        next({path:'/login'});
        return ;
    }

    //页面组件验证
    var route_index=_.findIndex(Routes, function(item) { return (item.path) == to.path; });
    if(route_index==-1){
        Toast.fail('路由对应组件不存在: "'+to.path+'"');
        return ;
    }

    next();
});
```

> 以上代码在路由改变的时候做了以下几件事 : 
>
> 1. 校验登录状态，如果没有登录就跳到登录页
> 2. 每次切换路由，除了登录页都判断是否有登录状态
> 3. 校验组件存不存在，如果没有弹个错误提示

### router.beforeEach

> 全局前置守卫
>
> 默认会有三个参数 : 
>
> `to` : 正要进入的路由
>
> `from` : 正要离开的路由
>
> `next` : 是个方法，一定要执行一下这个方法才能结束

#### next的参数

> `next()` 表示结束
>
> `next(false)` 中断当前路由的跳转，会回到`from`过来的路由
>
> `next('/xxx') or next({ path: '/' }) ` 表示跳转到其他路由地址
>
> `next(error)` 2.4新增，如果传入`error` 它就回去执行你写在` router.onError()` 回调中的方法

### router.beforeResolve

> 在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后调用**
>
> 全局解析守卫

### router.afterEach

> 后置钩子，就是已经跳转过后
>
> 接收的参数为`to`和`from `
>
> 它无法改变路由也不用调用`next`



写到这里

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


### 路由独享守卫

> 作用和全局的`beforeEach` 一样，不过它是只为单独的组件工作
>
> 直接在路由表中定义`beforeEnter` 

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
});
```

- 一些其他能在组件上定义的导航守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```










