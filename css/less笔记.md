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

- 可以使用 `/**/` `//` 两种注释

```less
/*这个注释是CSS中的注释，因此会编译到css中*/
//这个注释,CSS中用不了，因此不会编译出来。
```

## less变量

语法：  `@变量名:值`

```less
@charset "UTF-8";
@main_color:#e92322;
body {
  background-color: @main_color;
}

div {
  width: 400px;
  height: 400px;
  border: 1px solid @main_color;
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







