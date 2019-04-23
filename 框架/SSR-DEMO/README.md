# vue ssr 项目实战
## 项目一
```shell

mkdir project1
cd project1
npm init -y
npm i express vue-server-renderer vue -D
touch server.js

```
> ssr 渲染要用到vue官方提供的`vue-server-renderer`使用

```js
// 1. 引包
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

// 2. 生成vue实例
const app = new Vue({
  template: `<div>app demo 1</div>`
})

// 3. 开启express服务器
server.get('/',(req,res) => {

  // 4. 使用 renderer.renderToString 将vue实例变成字符串返回给浏览器
  renderer.renderToString(app,(err, html) => {
    if (err) { return res.state(500).end('运行时错误') }
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Vue2.0 SSR渲染页面</title>
        </head>
        <body>
            ${html}
        </body>
    </html>
    `)
  })
})

// 5.监听端口
server.listen('8888', _ => {
  console.log(`http://localhost:8888`);
  
})

```

> `renderToString` 做的事，就是给vue实例绑定的div加上了一条`data-server-rendered="true"` 属性，告诉浏览器的vue实例使用ssr的方式去加载vue。

## 项目二

> `tree -L 2 -I "node_modules"`
>
> 项目目录

```json
{
  "name": "project2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "webpack --config ./webpack/webpack.server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.16.0",
    "babel": "^6.23.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "body-parser": "^1.18.3",
    "compression": "^1.7.2",
    "express": "^4.15.4",
    "express-http-proxy": "^1.2.0",
    "gulp": "^3.9.1",
    "gulp-shell": "^0.6.5",
    "http-proxy-middleware": "^0.18.0",
    "less": "^3.0.4",
    "less-loader": "^4.1.0",
    "shell": "^0.5.0",
    "superagent": "^3.8.3",
    "vue": "^2.2.2",
    "vue-meta": "^1.5.0",
    "vue-router": "^2.2.0",
    "vue-server-renderer": "^2.2.2",
    "vue-ssr-webpack-plugin": "^3.0.0",
    "vuex": "^2.2.1",
    "vuex-router-sync": "^4.2.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^6.4.1",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.4",
    "style-loader": "^0.18.2",
    "vue-loader": "^11.1.4",
    "vue-template-compiler": "^2.2.4",
    "webpack": "^2.7.0"
  }
}

```



```
├── dist
│   └── bundle.server.js
├── entry
│   └── entry-server.js
├── package-lock.json
├── package.json
├── server.js
├── src
│   ├── App.vue
│   ├── main.js
│   ├── route.js
│   └── routes
│       ├── a.vue
│       └── b.vue
└── webpack
    └── webpack.server.js
```

> 目的是要在服务端的vue + router 用webpack打包好返回到浏览器，并且用experss监听路由的变化返回对应的路由页面。
>
> 这里的vue实例都是通过函数return出来的，目的是为了让请求每次都可以拿到不同的vue实例

1. 写vue项目的结构树 src/app ... 等
2. 写俩工厂函数，return出vue实例和vue-router实例，从main.js输出出来。
3. 在 `entry-server.js` 引入，并返回一个promise，值为对应的路由组件
4. 在webpack配置为入口，出口为`dist/bundle.server.js` 
5. server.js 开启，对应返回路由页面。



### 具体实现

- 写vue项目,并return出vue实例

```shell
mkdir project2
cd project2
mkdir src
cd src
touch App.vue
touch router.js
touch main.js
mkdir routes
cd routes
touch a.vue
touch b.vue
```

> routes文件夹中的组件便是路由组件，他们和App.vue随便写一点内容导出即可
>
> router.js 引入vue-router 并用函数返回一个router实例
>
> main.js 也是函数返回一个router实例



```js
/* router.js */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function createRouter() {
    let router = new VueRouter({
        // 要记得增加mode属性，因为#后面的内容不会发送至服务器，服务器不知道请求的是哪一个路由
        mode: 'history',
        routes: [
            {
                alias: '/',
                path: '/a',
                component: require('./routes/a.vue')
            },
            {
                path: '/b',
                component: require('./routes/b.vue')
            }
        ]
    })

    return router
}
```



```js

/* main.js */
import Vue from 'vue'
import createRouter from './route.js'
import App from './App.vue'


// 导出一个工厂函数，用于创建新的vue实例
export function createApp() {
    const router = createRouter()
    const app = new Vue({
        router,
        render: h => h(App)
    })

    return app
}
```



```vue
<!-- App.vue -->
<template>
  <div>
    <h1>vue ssr</h1>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return {
      a: 1
    }
  },
  mounted() {
    
  }
}
</script>

```

- 编写入口文件,返回 promise

```js


/* entry-server.js */
import { createApp } from '../src/main'

export default context => {
    return new Promise((resolve, reject) => {
        const app = createApp()

        // 更改路由
        app.$router.push(context.url)

        // 获取相应路由下的组件
        const matchedComponents = app.$router.getMatchedComponents()

        // 如果没有组件，说明该路由不存在，报错404
        if (!matchedComponents.length) { return reject({ code: 404 }) }

        resolve(app)
    })

}
```

- 配置用于打包的webpack

```js
/* webpack.server.js */
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');


module.exports = {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    target: 'node',
    entry: path.join(projectRoot, 'entry/entry-server.js'),
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.server.js',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    }
}
```

> 在package.json中配置命令,
>
> `  "server": "webpack --config ./webpack/webpack.server.js",`
>
> `npm run server` 进行打包 , 会在dist输出一个 `bundle.server.js`

- 服务端代码

```js
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server').default
// 响应路由请求
server.get('*', (req, res) => {
  
  const context = { url: req.url }

  // 创建vue实例，传入请求路由信息
  createApp(context).then(app => {
    
      renderer.renderToString(app, (err, html) => {
          if (err) { return res.state(500).end('运行时错误') }
          res.send(`
              <!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <title>Vue2.0 SSR渲染页面</title>
                  </head>
                  <body>
                      ${html}
                  </body>
              </html>
          `)
      })
  }, err => {
    if(err.code === 404) { res.status(404).end('所请求的页面不存在') }
    res.end(`${err}`,'utf-8')
  })
})

server.listen('8080', _ => {
  console.log(`http://localhost:8080`);
})
```

> `node server` 
>
> 然后在浏览器打开 `http://localhost:8080` ,便可看到ssr渲染的页面
>
> 然后切换到不同路由会发现每次跳转都会到服务器再拿一份完整的页面。
>
> 到这步已经有了ssr渲染，但还差一个spa的效果。

### 增加client端功能

> 在以上的基础上，加打包一个用在浏览器端的代码。
>
> 在返回的html中通过 script标签引入，这样只会在第一次请求项目的时候会返回所有代码，接下去的操作全都变为原来的spa流程。
>
> src中的文件为公共部分，所以不用修改。需要增加client的入口文件和webpack打包配置



```js
/* entry-client.js */
import { createApp } from '../src/main'


const app = createApp()

// 绑定app根元素
window.onload = function() {
  app.$mount('#app')
}
```



```js
/* webpack.client.js */
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');


module.exports = {
  // 入口改为client
  entry: ['babel-polyfill', path.join(projectRoot, 'entry/entry-client.js')],
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: 'bundle.client.js',// 出口改为client
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/,
        options: {
              presets: ['es2015']
        }
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  }
};
```

- 修改一下server，目的是为了在返回的html中引入打包的client.js

```js
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server').default

// 配置服务器的静态文件目录，很重要。
server.use('/',express.static(__dirname + '/dist'))

const clientBundleFileUrl = '/bundle.client.js'
// 响应路由请求
server.get('*', (req, res) => {
  
  const context = { url: req.url }

  // 创建vue实例，传入请求路由信息
  createApp(context).then(app => {
    
      renderer.renderToString(app, (err, html) => {
          if (err) { return res.state(500).end('运行时错误') }
          res.send(`
              <!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <title>Vue2.0 SSR渲染页面</title>
						// 这里引入
                      <script src="${clientBundleFileUrl}"></script>
                  </head>
                  <body>
                    <div id='app'>
                        ${html}
                    </div>
                  </body>
              </html>
          `)
      })
  }, err => {
    if(err.code === 404) { res.status(404).end('所请求的页面不存在') }
    res.end(`${err}`,'utf-8')
  })
})

server.listen('8081', _ => {
  console.log(`http://localhost:8081`);
})
```

```json
// package.json增加命令
"client": "webpack --config ./webpack/webpack.client.js"
```

> 执行以下命令
>
> `npm run client`
>
> `npm run server`
>
> `node server`

## 项目三

- server side rendering

> 项目二已经完成了`server side`，但还差一个`rendering`。
>
> 服务端渲染要在服务器将数据请求过来渲染到页面上，返回到浏览器。
>
> 服务器获取的数据要挂在到浏览器的vue实例，那么数据肯定是要保持一致的。
>
> 所以这里的数据都会放到store里面，服务器和浏览器一起使用。
>
> 那么，在此就将数据渲染加上。
>
> 复制项目二到项目三
>
>
>

-  渲染数据有两种方案： 
>
> 1. 找到对应的路由，再在路由页面去请求数据渲染页面。
> 2. 先请求对应路由的接口，拿到了数据再去找页面。
>
> 这个看具体用户体验选择一种，这里实现第一种



- 增加一个接口请求用来测试

```js
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
Vue.use(Vuex)

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      msg: ''
    },
    mutations: {
      setMsg(state, msg) {
        state.msg = msg
      }
    },
    actions: {
      getMsg( { commit } ) {
        // 这个接口会写在server.js 用express开个接口
        return Axios.get('http://localhost:8081/api/getMsg').then( res => {
          commit('setMsg',res.data)
        } )
      }
    }
  })
  return store
}
```

- 找一个组件请求接口

```vue
<!-- home.vue -->
<template>
	<div>
		<h1>home</h1>
		<p>{{msg}}</p>
	</div>
</template>


<script>
export default {
	serverRequest(store) { // 这个名字随意取，但每个请求名称最好保持一致
		return store.dispatch('getMsg')
	},
	mounted() {

	},
	computed: {
		msg() {
			return this.$store.state.msg
		}
	}
}
</script>
```

- 改写entry-server

```js


/* entry-server.js */
import { createApp } from '../src/main'

export default context => {
    return new Promise((resolve, reject) => {
        const app = createApp()

        // 更改路由
        app.$router.push(context.url)

        // 获取相应路由下的组件
        const matchedComponents = app.$router.getMatchedComponents()

        // 如果没有组件，说明该路由不存在，报错404
        if (!matchedComponents.length) { return reject({ code: 404 }) }
        Promise.all(matchedComponents.map( v => {
            // 通过自定义的 serverRequest 来判断哪些组件有请求要做
            if(v.serverRequest) {
                return v.serverRequest(app.$store)
            }
        } ))
        .then( _ => {
            // 将请求的状态放到 context对象的state里面，为了server.js 返回的时候能拿到
            context.state = app.$store.state
            resolve(app)
        } )
        .catch(reject)
    })

}
```



- 改写server.js

```js
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server').default

server.use('/',express.static(__dirname + '/dist'))

const clientBundleFileUrl = '/bundle.client.js'

server.get('/api/getMsg', (req,res) => { // 接口地址
    res.send('获取到的信息请求')
} )

// 响应路由请求
server.get('*', (req, res) => {
  
  const context = { url: req.url }

  // 创建vue实例，传入请求路由信息
  createApp(context).then(app => {
      // 重点就是这个，把store对象塞到浏览器的一个script里面
    let state = JSON.stringify(context.state)
		renderer.renderToString(app, (err, html) => {
			if (err) { return res.state(500).end('运行时错误') }
			res.send(`
					<!DOCTYPE html>
					<html lang="en">
							<head>
									<meta charset="UTF-8">
									<title>Vue2.0 SSR渲染页面</title>
									<script>window.__INITIAL_STATE__ = ${state}</script>
									<script src="${clientBundleFileUrl}"></script>
							</head>
							<body>
								<div id='app'>
										${html}
								</div>
							</body>
					</html>
			`)
		})
  }, err => {
		if(err.code === 404) { res.status(404).end('所请求的页面不存在') }
		console.log(err);
		
    res.end(`${err}`)
  })
})

server.listen('8081', _ => {
  console.log(`http://localhost:8081`);
})
```



- 改写entry-client

```js
/* entry-client.js */
import { createApp } from '../src/main'


const app = createApp()

// 这样就能拿到服务器生成的store对象，并替换浏览器的store对象
if(window.__INITIAL_STATE__) {
  app.$store.replaceState(window.__INITIAL_STATE__)
}

// 绑定app根元素
window.onload = function() {
  app.$mount('#app')
}
```

> 