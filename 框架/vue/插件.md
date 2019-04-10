## 给 vue 添加插件

> 插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：
>
> 1. 添加全局方法或者属性，如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)
> 2. 添加全局资源：指令/过滤器/过渡等，如 [vue-touch](https://github.com/vuejs/vue-touch)
> 3. 通过全局 mixin 方法添加一些组件选项，如: [vue-router](https://github.com/vuejs/vue-router)
> 4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
> 5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

[plugins](https://cn.vuejs.org/v2/guide/plugins.html)



在项目中新建`demo.js`

如下

```js
/**
 * 添加插件
 * 
 */
const Demo = {
  install(Vue,options) { // 当 Vue.use 时会执行它
    // console.log(Vue,options);
    console.log('安装');
     // 1. 添加全局方法或属性
    // Vue.myGlobalMethod = function () {}

    // 2. 添加全局指令 v-loading 的做法就类似于这样
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //   }
    // })

    // 3. 注入组件
    Vue.mixin({ // 全局 mixin
      // created: function () {
      //   console.log('注入成功');
        
      // }
    })

    // 4. 添加实例方法
    Vue.prototype.$demo = function (methodOptions) {
      // 在项目组件中就可以使用 this.$demo 做一些事了
      console.log('$demo');
      
    } 
  }
}

export default Demo
```

- 使用

在 `main.js` 引入

```js
import Demo from '@/plugins/Demo';
Vue.use(Demo)
```

