# less编译

## 使用less.js编译

```html
<!--第一步，引入less文件-->
<link rel="stylesheet/less" href="01.less">
<!--第二部：引入less.js文件-->
<script src="less.js"></script>
```

**注意：这种方式必须在http协议下运行，因为本质上less.js是通过ajax请求了less文件，进行编译。**

缺点：

1. 需要多引入一个less.js文件
2. 需要多一次http请求，file协议打开无效
3. 如果浏览器禁用了js，那么无法生效

## 使用koala(考拉)编译

> koala是一个前端预处理器语言图形编译工具，支持Less、Sass、Compass、CoffeeScript，帮助web开发者更高效地使用它们进行开发。跨平台运行，完美兼容windows、linux、mac。

[考拉官网](http://koala-app.com/index-zh.html)

使用步骤：

1. 把`less`文件夹拖进去
2. 会在当前目录生成一个`css`目录

优点：不用node环境，不用less环境，koala内置了。

## 使用webstorm编译

使用步骤：

1. 安装less环境
2. 配置less的路径

# less学习

## less注释

```less
/*这个注释是CSS中的注释，因此会编译到css中*/
//这个注释,CSS中用不了，因此不会编译出来。
```



## less变量

语法：  `@变量名:值`

```less
@charset "UTF-8";
@wjs_color:#e92322;
body {
  background-color: @wjs_color;
}

div {
  width: 400px;
  height: 400px;
  border: 1px solid @wjs_color;
}
```

## mixin混入

> less允许使用混入添加一个公共的样式

+ 混入类

```less
@charset "UTF-8";
.btn_base {
  width: 200px;
  height: 50px;
  background-color: pink;
}

.btn_border {
  border: 2px solid #000;

}

.btn {
  .btn_base();
  .btn_border();
}
```

+ 混入函数（无参数）

```less
//不会被编译
.btn_base() {
  width: 200px;
  height: 50px;
  background-color: pink;
}
//不会被编译
.btn_border() {
  border: 2px solid #000;

}

.btn {
  .btn_base();
  .btn_border();
}
```

+ 混入函数，带参数

```less
.btn_border(@width) {
  border: @width solid #000;

}

.btn {
  .btn_border();//报错
  .btn_border(10px);//不报错
}
```

+ 混入函数，带参数默认值

```less
//默认宽度为1px
.btn_border(@width:1px) {
  border: @width solid #000;

}

.btn {
  .btn_border(1px);//不报错
  .btn_border(10px);//不报错
}
```

## less嵌套

```less
.father {
  font-size: 12px;
  //子代选择器
  >.son1 {
    font-size: 14px;
  }
  //后代选择器
  .son2 {
    font-size: 16px;
  }

  //&表示自己
  &::before {
    content:'';
    font-size: 11px;
  }
}
```

## import导入

```less
@charset "UTF-8";
@import "base.less";//引入base模块
@import "header.less";//引入header模块
@import "nav.less";//引入nav模块
@import "footer.less";//引入footer模块
```

## less运算与函数

> 在css中可以会涉及到一些数字的运算，使用less可以非常轻易的完成。

运算：

```less
div {
  width: 100%/6;
  height: 500px * 2;
}

.col(@num){
  width: 100%/12 * @num;
}

.col-1 {
  .col(1);
}
.col-2 {
  .col(2);
}
.col-3 {
  .col(3);
}
.col-4 {
  .col(4);
}
```

常见函数：

http://www.1024i.com/demo/less/reference.html

```javascript
.col(@num){
  width: round(100%/12 * @num, 2);
}
```

# 京东购物车

# REM

## rem是什么？

`rem`（font size of the root element）是指相对于根元素的字体大小的单位。它就是一个相对单位。

`em`（font size of the element）是指相对于当前元素的字体大小的单位。它也是一个相对单位。

它们之间其实很相似，只不过计算的规则一个是依赖根元素，一个是当前元素计算。

```css
html{
  font-size:16px;
}
body {
  font-size:20px;
}
div.em {
  /*em的计算方式参照的当前元素的font-size，如果不设置，默认继承自父盒子*/
  width:2em;
  height:2em;
  background-color:red;
}
/*rem的计算方式参照的是html的font-size*/
div.rem {
  width:2rem;
  height:2rem;
  background-color:blue;
}
```



## 为什么要用rem？

> rem的主要目的就是解决用于不同屏幕的适配问题。rem能够等比例的适配所有的屏幕。

由于市面上手机种类繁多，导致移动端的屏幕种类非常的混乱，比如有常见的`320px 360px 375px 384px 480px 640px`等。在开发中，美工一般只会提供750px或者是640px的设计稿，这就要求我们通过一张设计稿能够适配所有的屏幕。通常解决方案如下：

- 流式布局：虽然可以让各种屏幕都适配，但是显示效果不是非常的友好，因为只有几个尺寸的手机能够完美的显示出来视觉设计师和交互最想要的效果。但是目前使用流式布局的公司非常多，比如 [亚马逊](https://www.amazon.cn/) 、[京东](https://m.jd.com/) 、[携程](https://m.ctrip.com/)
- 响应式布局：响应式这种方式在国内很少有大型企业的复杂性的网站在移动端用这种方法去做，主要原因是***工作大，维护性难*** 。所以一般都是中小型的门户或者博客类站点会采用响应式的方法从PC端页面到移动端页面以及web app直接一步到位，因为这样反而可以节约成本。
- rem布局：rem能够适配所有的屏幕，与less配合使用效果会更好。目前使用rem布局的有：[淘宝](https://m.taobao.com) 、 [苏宁](https://m.suning.com/)



## rem与响应式

因为rem的基准点是根元素html的字体大小，因此我们只需要设置不同屏幕的html的font-size大小不一样就可以达到不同屏幕的适配了。 

### rem与媒体查询

使用rem配合媒体查询可以适配多个终端

```css
@media (min-width: 320px) {
  html {
    font-size: 16px;
  }
}

@media (min-width: 360px) {
  html {
    font-size: 18px;
  }
}
@media (min-width: 384px) {
  html {
    font-size: 19.2px;
  }
}

@media (min-width: 414px) {
  html {
    font-size: 20.7px;
  }
}
```

优点：使用媒体查询适配，速度快。

缺点：适配多个终端时，需要添加响应的代码。

### rem与javascript

通过javascript获取可视区的宽度，计算font-size的值，也可以适配多个终端。

```javascript
function responsive() {
  var uiWidth = 750;//设计图宽度
  var fontSize = 50;//设计图中1rem的大小
  //当前屏幕的大小
  var pageWidth = window.innerWidth;
  if(pageWidth >= 750) {
    pageWidth = 750;
  }
  if(pageWidth <= 320) {
    pageWidth = 320;
  }
  //说白了就是把一个屏幕分成了15rem
  document.documentElement.style.fontSize = (50/750 * pageWidth).toFixed(2) + "px";
}
```

优点：直接适配所有的终端

缺点：必须在页面加载之前设置html的font-size值，不然会出现文字大小调动的情况。



# 苏宁易购

## 适配主流浏览器

```less
//适配主流浏览器
//320 360 375 384 400 414 424 480 540 720 750
//把屏幕分成15rem
.adapter(@screen:320px) {
  @media (min-width: @screen) {
    html {
      font-size: round(@screen/15, 2);
    }
  }
}
```







