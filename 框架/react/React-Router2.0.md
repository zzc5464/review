# React Router 2.x

## 准备

[官方demo](https://github.com/reactjs/react-router-tutorial) 一共14个例子

```sh
git clone https://github.com/reactjs/react-router-tutorial.git
```

浏览器打开` http://localhost:8080/`

## Vue VS React基础router配置

**vue-router** 

> vue-router是一个js对象的配置

- 安装

```sh
npm i vue-router -S
```

- 配置

```js
import VueRouter from 'vue-router'
const Home = {
    template: `<div>Home</div>`
}
const About = {
    template: `<div>About</div>`
}
const Router = new VueRouter({
    routers:[
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
})
```

**react-router**

> react-router是一个组件
>
> `hashHistory` 表示以 # hash的方式管理路由
>
> 一个 `<Router history={hashHistory}>` 组件下面套`<Route path='/' component={Home} />`组件
>
> 基础配置路由也是`path`，`component`

- 安装

```sh
npm i react-router@2.0.0 -S
```

- 配置

```jsx
import React from 'react'
import { render } from 'react-dom'
import {Router,Route,hashHistory} from 'react-router';
const Home = React.createClass({
  render() {
    return <div>home</div>
  }
})
const About = React.createClass({
  render() {
    return <div>about</div>
  }
})
render((
  <Router history={hashHistory}>
    <Route path='/' component={Home} />
    <Route path='/about' component={About} />
  </Router>
),document.getElementById('app'))

```

## Vue VS React link

> link也就是a标签，但通过了路由特殊处理的a标签。
>
> 两个框架的实现都是组件，通过属性`to` 跳转路由

**vue router-link**

```vue
<router-link to='/home'>home</router-link> // 跳转到 /home 路由
<router-link :to='home'>home</router-link> // 通过v-bind绑定命名的路由
```

**react router-link**

```jsx
import {Link} from 'react-router';
<Link to='/repos'>repos</Link>
```

### Active Link

> 使用`Link` 的一个好处是组件内置了一个样式，通过修改这些样式可以很容易实现导航切换的效果

**Vue Active**

> 会自动给你带上一个`router-link-active` 的类，**给这个类加一些样式**

**React Active**

- style方式

```jsx
<li><Link to="/home" activeStyle={{ color: 'red' }}>Home</Link></li>
```

- class 方式

```jsx
<li><Link to="/about" activeClassName="active">About</Link></li>
```

### 编程导航

**vue**

```js
this.$router.push({path:'/about'})
```

**react**

```js
import { browserHistory } from 'react-router';
browserHistory.push('/about');
// 或者在组件内部的函数中使用this.context
handleSubmit(event) {
   
    this.context.router.push(path)
},
```



### Index Link

**React IndexLink**

> `/` 根路径是所有路径他爹，所以使用了LinkStyle来指定样式，链接到根路径的时候会无效。
>
> 那就要使用`indexLink` 组件了

```jsx
<IndexLink to="/" activeClassName="active">
Home
</IndexLink>
```

> 如果不想使用IndexLink，可以给普通的Link加上`onlyActiveOnIndex` 属性为true即可

```jsx
<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link>
```



## Vue Vs React 子路由(嵌套)

> 当单个路由页面满足不了你的时候就要用到嵌套路由。
>
> 相当于一个文件夹下面的不同文件，他们都在该文件夹之下，但是展现的完全不同
>
> 比如 `/user/login` `/user/register`

**Vue Nested**

```js
// 组件声明省略。。。
var router = new VueRouter({
  routes:[
    path:'/user',
    component:user,
    children:[ // 通过children
    	{
    		path:'login',
    		component:login
      		// children 可以一直嵌套下去
    	},
    	{
			path:'register',
    		component:Register
    	}
  	]
  ]
})
```

**React Nested**

> 通过`<Route>` 组件嵌套的写法创建嵌套路由

```jsx
// 组件声明省略。。。
render((
  <Router history={hashHistory}>
    <Route path="/user" component={User}>
    {/* 嵌套路由 */}
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

> 也可以单独拉个页面来陪路由组件再传参

```jsx
const routes = <Route path="/" component={App}>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Route>;

<Router routes={routes} history={browserHistory}/>
```

> `<Route>` 的`path`属性是可以省略的
>
> 比如下面这两条是等价的

```jsx
<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
<Route component={Inbox}>
   <Route path="/index/messages/:id" component={Message} />
</Route>
```

### 路由的匹配规则

> 路由的匹配规则

```js
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// () 表示可选
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

> **1、**
>
> `:paramName`匹配URL的一个部分，直到遇到下一个`/`、`?`、`#`为止。
>
> **（2）()**
>
> `()`表示URL的这个部分是可选的。
>
> **（3）\***
>
> `*`匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
>
> **（4） \****
>
> `**` 匹配任意字符，直到下一个`/`、`?`、`#`为止。匹配方式是贪婪模式。

- 相对路径模式

> 如果不以`/` 匹配时就会以父组件的路径参照。
>
> 路由从上到下执行，一旦匹配就不往下执行。
>
> 如下路由走不到第二个。

```jsx
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```



## Vue Vs React 路由传参

> 不要和子路由搞混了，这是一个相同页面，根据不同的路由参数进行内容变化。
>
> `/userInfo/1`
>
> `/userInfo/2`

**Vue 传参**

> vue获取路由参数都挂在了`this.$route` 上

- query

> 直接在路由地址的后面像get请求一样传参

写法： `/userInfo?id=1`

获取: `this.$router.query` => `{id:1}`

- params

> 这需要在路由表中进行设置

```js
const router = new VueRouter({
  routes:[
    //就是给路径后面加了一个:,参数名随意指定
    //这里指定为id，那么this.$route.params获取的也是id
    path:'/userInfo:id'
  ]
})
// 使用
// /userInfo/1
// 获取
this.$route.params // {id:1}
```

**React 传参**

- query

```jsx
<Route path="/userInfo?id=1" component={UserInfo}/>
```

使用 `this.props.location.query` 获取 `{id:1}`

> 获取路由参数在 `this.props.params`

```jsx
<Route path="/userInfo/:id" component={UserInfo}/>
```

- 在组件内部获取

```jsx
<Link to="/userInfo/1">React Router</Link>
```

```jsx
// {id: 1}
React.createClass({
  // this.props.params.id = 1
  render() {
    return (
      <div>
        <h2>{this.props.params}</h2>
      </div>
    )
  }
})
```

## Vue VS React 路由视图

> 当遇到后台管理系统类的需求，左侧和顶部导航固定，内容不断的变化。
>
> 则需要让某一路由是这些路由的顶路由，其他路由都在其内部变化。
>
> 也就是SPA应用的入口页面,指定路由在哪张页面进行切换。

**Vue Router-View**

- 配置一个 `<router-view>` 组件

```vue
<div id='app'>
     <router-view></router-view>
</div>
```

**React props-children**

```jsx
// App.js
import React from 'react'
export default React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

```

## Vue VS React 首路由

> 也就是打开应用的index.html

**Vue**

> 默认是 '/'
>
> 如果需要是其他页面，可以通过配置路由表的重定向 `redirect`

```js
const router = new VueRouter({
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

**React Index Routes**

> 如下代码: 
>
> 匹配`/accounts ` `/statements` 都可以
>
> 访问`/` 时,`<App />` 的`this.props.children` 是`undefined`

```jsx
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```

> `<IndexRoute>` 就是为了解决此问题

方式1: 

> 这样相当于如果匹配不到路由，默认展示`Home` 组件

```jsx
// App.js
import React from 'react'
import Home from 'home.jsx'
export default React.createClass({
  render() {
    return (
      <div>
        {this.props.children || <Home />}
      </div>
    )
  }
})


```

方式2：

> 使用`IndexRoute`组件，显式指定`Home`是根路由的子组件。

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory,
  IndexRoute // 第二种方式 引入IndexRoute 组件
 } from 'react-router'
import App from './modules/App'
import About from './modules/About'
import Home from './modules/Home';
// 默认显示一个路由，在路由不匹配的情况下，默认访问到此路由
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} /> 
      {/* 第二种方式 IndexRoute */}
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))

```

### redirect组件

> 重定向路由的组件

```jsx
import { Router,Redirect,Route} from 'react-router'
<Route path="inbox" component={Inbox}>
  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```

> `IndexRedirect` 组件，首路由重定向。

```jsx
<Route path="/" component={App}>
  ＜IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
```



## Vue Vs React 路由模式

> 路由的默认配置是通过 `/#` 哈希的方式进行路由管理
>
> 如果想有传统页面一样`a/b/c` 模式管理可以进行配置
>
> 该配置都需要后台配置

**Vue mode**

```js
 const router = new VueRouter({
  mode: 'history',
  routes: []
})
```

**React browserHistory**

```jsx
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
  </Router>
), document.getElementById('app'))
```

**React createMemoryHistory**

> `createMemoryHistory`主要用于服务器渲染。它创建一个内存中的`history`对象，不与浏览器URL互动。

```jsx
const history = createMemoryHistory(location)
```

## Vue Vs React 导航守卫

> vue叫导航守卫，react叫路由的钩子
>
> 说白了就是操作路由时候触发的函数

**vue**

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
// 组件内部的钩子还有 beforeRouteEnter beforeRouteUpdate beforeRouteLeave
```

**react**

```jsx
const requireAuth = (nextState, replace) => {
    if (!auth.isAdmin()) {
        // Redirect to Home page if not an Admin
        replace({ pathname: '/' })
    }
}
<Route path="inbox" component={Inbox}>
  <Route
    path="messages/:id"
    onEnter={
      requireAuth
    } 
  />
</Route>
```

> 组件内部的钩子

```js
React.createClass({
    componentDidMount() {
      this.props.router.setRouteLeaveHook(
        this.props.route, 
        this.routerWillLeave
      )
    },

    routerWillLeave(nextLocation) {
      // 返回 false 会继续停留当前页面，
      // 否则，返回一个字符串，会显示给用户，让其自己决定
      if (!this.state.isSaved)
        return '确认要离开？';
    },
  })
```

