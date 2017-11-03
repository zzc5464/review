# 进度条与遮罩层

+ nprogress插件的使用
+ ajax的6个全局事件

## nprogress进度条插件

> nprogress插件是一个适用于ajax应用的轻量级的进度条插件。

[官网](http://ricostacruz.com/nprogress/)

[github地址](https://github.com/rstacruz/nprogress)

参考文档：<http://blog.csdn.net/joyhen/article/details/24458427>

### 使用步骤

+ 引入js文件和css文件

```html
<link rel='stylesheet' href='nprogress.css'/>
<script src='nprogress.js'></script>
```

+ 使用进度条插件

```javascript
//引入了nprogress.js文件后，就有了一个全局对象NProgress对象
//开启进度条
NProgress.start();
//关闭进度条
NProgress.done();
```

### 使用场景

+ 添加到你调用 Ajax 的地方！绑定它到 jQuery `ajaxStart` 和 `ajaxStop` 事件上


## JQ中AJAX的全局事件

> ajax提供了6个全局函数，会被页面中所有的ajax请求触发，在不同时间点会触发不同的全局事件。

在页面中会有很多的ajax请求，但是这些ajax请求都有相同的消息机制，比如我们需要在ajax请求发送之前弹出了一个提示框，提示"正在读取数据...." 在ajax请求成功时显示"获取数据成功...",在ajax结束后隐藏提示框。如果不使用全局事件，那么需要在每一个ajax的beforeSend、success、complete回调函数中都加上相同的代码。



+ jquery的全局事件需要给document注册（固定写法）

```javascript
$(document).ajaxStart(function () {
  console.log("ajaxStart在开始一个ajax请求时触发");
});
```

+ 全局事件的执行时机

```javascript
1. ajaxStart在开始一个ajax请求时触发

//beforeSend回调函数
2. ajaxSend在beforeSend回调函数之后触发

//success回调函数
3. ajaxSuccess在success回调函数之后触发

//error
4. ajaxError在error回调函数之后触发

//complete
5. ajaxComplete在complete回调函数之后触发

6. ajaxStop在ajax请求结束时触发
```
