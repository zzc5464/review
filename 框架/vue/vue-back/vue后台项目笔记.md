# vue后台项目笔记

## 项目结构

```
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 vuex 数据管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view层，所有的组件
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
```

> 模块有很多，而且随着业务的迭代，模块还会会越来越多。
>
> - 所以这里建议根据业务模块来划分 views，并且 将views 和 api 接口两个模块一一对应，从而方便维护。
> - 公用的一些api则单独放置在一个文件中就行
>
> 例如：

![](https://user-gold-cdn.xitu.io/2017/5/3/c185f7d37a268a1ff4044ff60f5341c0?imageslim)

- `src/components/..` 目录中放置的是所有全局组件，一般是常用的功能，比如上传图片。。
- 而不同的路由页面则放在`src/views` 中

### 关于vuex

> 有些数据还是需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体当然还是要结合自己的业务场景的。总之还是那句话，不要为了用vuex而用vuex！

### 关于此项目的模板

> 基于vue-cli构建的，我自行移除了eslint的坑爹配置

### 关于jquery

> 不用去考虑和vue的思想冲突问题，为了开发效率一切都是假象。
>
> 如果遇到$冲突的问题使用webpack提供的`ProvidePlugin`插件配置

```js
// webpack.dev.conf.js 文件中
plugins:[
  new webpack.ProvidePlugin({
    $: 'jquery' ,
    'jQuery': 'jquery'
	}),
]
```

> 这样当 webpack 碰到 require 的第三方库中出现全局的$、jQeury和window.jQuery 时，就会使用 node_module 下 jquery 包 export 出来的东西了。

### alias，文件的路径指向配置

> 当项目逐渐变大之后，文件与文件直接的引用关系会很复杂，这时候就需要使用[alias](https://link.juejin.im/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fresolve%2F) 了。
> 有的人喜欢alias 指向src目录下，再使用相对路径找文件

- 使用方法一：将路径指到src下面。

```js
// webpack.base.conf.js
resolve: {
  alias: {
    '~': resolve(__dirname, 'src')
  }
}
// 使用： import stickTop from '~/components/stickTop == src/components/stickTop
```

- 使用方法二

```js
alias: {
  // path.resolve 表示绝对路径
  'src': path.resolve(__dirname, '../src'),
  'components': path.resolve(__dirname, '../src/components'),
  'api': path.resolve(__dirname, '../src/api'),
  'utils': path.resolve(__dirname, '../src/utils'),
  'store': path.resolve(__dirname, '../src/store'),
  'router': path.resolve(__dirname, '../src/router')
}

//使用
import stickTop from 'components/stickTop'
import getArticle from 'api/article'
```

## 前端其他的工具

### **swagger**

> 是一个REST APIs文档生成工具，可以在许多不同的平台上从代码注释中自动生成，开源，支持大部分语言，社区好，总之就是一个强大，如下图的api 文档(swagger自动生成，ui忽略)
>
> [swagger](https://swagger.io/)

### mock

> 如果后端不肯来帮你 mock 数据的话，前端自己来 mock 也是很简单的。你可以使用mock server 或者使用 [mockjs](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fbadoo%2FMockJS) + [rap](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fthx%2FRAP) 也是很方便的。
>  不久前出的 [easy-mock](https://link.juejin.im?target=https%3A%2F%2Feasy-mock.com%2F)也相当的不错，还能结合 swagger。

### iconfont

- 第一章先到这里，其他的还不太懂