# 流行框架第一天：构建前端自动化工作流环境



## 学习目标

1. 了解什么是Node，什么是NPM；（Node.js）
2. 掌握Bower的使用；
3. 搭建一个自己的自动化工作流环境；

+ v自动编译
+ 自动合并
+ 自动刷新
+ 自动部署

4. GIT 与 GITHUB

+ master 托管源文件
+ gh-pages 托管部署文件
+ 在github搭建自己的blog

## 为什么要有自动化的流程

- 在我们的开发过程中有大量的重复操作
- DRY  Don't repeat yourself
- 开发人员的精力应放在哪？创造，新的一切

- 前端开发的编译操作


## 1.Node环境

### 1.1.什么是Node

- 不是JS文件，也不是一个JS框架

- 而是Server side Javascript runtime, 服务端的一个JS运行时

- 我们可以在NODE运行JS代码

- node中只能运行ECMAScript，无法使用 BOM 和 DOM

- 目前我们的JS是运行在浏览器内核中

- 如同php的运行环境php,java的运行环境是JDK

- 说到底就是一个JS运行环境

  #### 服务端的环境

  - 比如http://www.xxx.com/index.php,发送到服务器，如果没有php运行时，等于只是把这个文件下载下来。
  - 有了服务端环境则会把这个文件执行完了再返回给你。
  - node则是执行js文件的服务器环境。
  - 采用了**chromeV8引擎**
  - 在此基础上还包裹了一层api，可以进行文件、网络等操作


### Node环境搭建

#### Mac

- 安装包的方式
  + [pkg](https://nodejs.org/dist/v5.5.0/node-v5.5.0.pkg)
- NVM（Node Version Manager）

  ```bash
  $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
  $ echo '. ~/.nvm/nvm.sh' >> .bash_profile
  $ nvm install stable
  $ nvm alias default stable
  ```

#### Windows

- 安装包的方式
  + [msi_x64](https://nodejs.org/dist/v5.5.0/node-v5.5.0-x64.msi)

  + [msi_x86](https://nodejs.org/dist/v5.5.0/node-v5.5.0-x86.msi)

    ​

  #### NVM（Node Version Manager）

- 用于管理node包，现在可能用得少了，需要的了解一下。

- 因为NODE版本比较多，开发人员可能依赖很多版本

- 通过NVM，可以轻松切换于不同的版本之间

- 首先下载nvm的包，放到全英文路径。（推荐C盘）

- 不要点nvm.exe，找到setting.txt，打开。

  ```
  root: C:\Develop\nvm 
  path: C:\Develop\nodejs 
  arch: 64 
  proxy: none
  ```

  - 把root中的路径换成你nvm安装位置的路径。

  - path的路径和root保持一致，最后写成nodejs

  - 在nvm文件夹,shift+右键,cmd命令行中输入

  - nvm（回车）

  - 会出现版本信息，以及一些命令提示

    ##### 如果出错

    删掉setting.txt，管理员权限运行install.cmd，会弹出一个命令行。

    将nvm文件的路径复制到后面（回车）

    会新建一个setting.txt文件，内容还是上面一样，如果不是，就挨个填上。

    如果还是没有，重复如上步骤。

    如果死都不行，往下看环境变量配置。

    ​

    ##### 确保你有setting.txt文件，接下来继续。

    - 使用命令行操作nvm

      ```javascript
      $ nvm use 你的node版本      
      //该命令让你选择一个node版本进行使用，会有个nodejs快捷方式在nvm文件夹中。
      //表示使用哪个版本的node
      $ nvm ls
      //显示你所有的node版本
      ```

      ​

  ​

#### 环境变量

- 环境变量就是操作系统提供的系统级别用于存储变量的地方

- 系统变量和用户变量

  + 系统变量指的是所用当前系统用户共享的变量
  + 自己的电脑一般只有一个用户
  + 建议将自己配置的环境变量放在用户变量中，用户变量比较干净

- 环境变量的变量名是不区分大小写的

- 变量间运行相互引用

- 特殊值：

  + PATH变量（不区分大小写）
  + PATH 相当于一个路径的引用

- 只要添加到PATH变量中的路径，都可以在任何目录下搜索

  ```
  - 
   环境变量配置,把这三个变量放到用户变量的path里面，注意分号分割。
   
  NVM_HOME=C:\Develop\nvm

  NVM_SYMLINK=C:\Develop\nodejs

  NPM_HOME=C:\Develop\nvm\npm
  %里面的就是变量名称%
  PATH=%NVM_HOME%;%NVM_SYMLINK%;%NPM_HOME%
  ```

  ### Node.js使用介绍

  通过上面的安装，可以在命令行中输入

  ```
  $ node -v
  //查看当前使用的node版本，记住是在nvm use之后操作。
  $ npm -v
  //查看当前npm的使用版本
  ```


### Node用途

1. 开发Web应用程序

- 做动态网站
- 开发提供数据的服务端API

2. 前端开发工具基础

- Node.js给前端乃至整个开发行业带来一场工业革命

- demo

  ```javascript
  //打开cmd，输入
  $ node(回车)
  //进入js的REPL环境，下面就可以写js代码了，试试
  console.log("hello world")
  ```

  - 当然我们肯定是在IDE中把代码写好，然后用node执行。（就像java）。

  - 打开cmd，cd到你写的js文件目录。通过node +文件名执行

    ```ruby
    $ node 文件名
    ```

  - 以下是一个监听端口的服务

    ```javascript
    // 可以用来创建一个HTTP服务器
    var http = require('http');

    // 创建一个服务
    var server = http.createServer(function(request, response) {
      // // 只要有人来了就会执行此函数
      // console.log(request.url);
      // // 处理请求和响应
      // response.writeHead(200, {
      //   'Content-Type': 'text/html', // 告诉客户端我给你的是HTML
      //   'key1': 'value1'
      // });
      // // 往响应体中放数据（只能是字符串）
      // response.write('<h1>HAHAHA</h1>');
      // response.end(); // 结束了回去吧
    });
    // 启动服务
    server.listen(8080, function(error) {
      console.log('成功监听8080端口');
    });
    ```

    > Node.js是一个轻内核（本身没有什么功能）的东东，所有的功能都要功能包提供

    > node官方提供了一些最基础的包，通过npm来下载

    > npm下载来的包统一放在一个文件中方便管理，可以给这个路径也加上环境变量，就可以全盘使用了。

### NPM

#### 什么是NPM

[官网](https://www.npmjs.com/)
- Node Package Manager
- Node应用程序依赖包的管理工具
- 具有安装卸载更新之类的操作

#### 为什么使用NPM

- 官方+民间包，前端使用的所有包 很多
- 场景：我需要用一个A，A依赖B，B依赖C （bootstrap==>jQuery）
- 常见的包管理工具都有循环依赖的功能
- 你只需记住你要什么东西

#### 常见的NPM操作

```javascript
// 安装一个包，默认安装最新稳定版本

npm install 包/库的名字	//安装一个包或库，默认最新稳定版

//如果你要下特定版本的库   
npm install 包/库的名字@1.1.2 //@+版本号

npm install 包/库的名字 --save	
//将这个包的名字保存到package.json中的dependencies中，表示生产阶段
//别人拿到你的项目后通过npm install就可以下载项目中依赖的所有包
npm install 包/库的名字 --save--dev
//表示开发阶段用的包

// 初始化操作，给项目添加一个配置文件

npm init 


//会问你一些问题，按着提示写，完了会生成package,json文件

// --yes参数走默认配置
npm init --yes
//省的填了
```

- 更多的操作看官网


- 官网容易被墙，用淘宝的好了。
- [淘宝镜像](https://npm.taobao.org/)


*****

## Bower

### 什么是Bower

- [官网](http://bower.io/)
- web应用程序依赖项管理工具
- 和npm很像，不过npm一般管理nodejs的包
- 像一些前端的包用bower管理
- 就是重复的轮子


### 为什么使用Bower

- 装逼

### Bower配置

```
npm install -g bower // -g:global 全局环境中安装
```

- 修改npm全局路径，就是在用户目录下添加.npmrc文件,然后里面写nvm所在的根目录

  ```
  //里面写nvm所在的根目录\npm-cache，其他不要变
  cache=C:\Develop\nvm\npm-cache
  prefix=C:\Develop\nvm\npm
  //把这个文件放到用户目录，注释的文字不要复制黏贴
  ```

- bower没啥用


*****

## 4.Gulp

### 4.1.Gulp简介

- 链接：
  + [官网](http://gulpjs.com/)
  + [中文网](http://www.gulpjs.com.cn/)
- 就是用来机械化的完成重复性质的工作
- gulp的机制就是将重复工作抽象成一个个的任务，

### 4.2.Gulp准备工作

- 安装Node.js
- 安装 gulp 命令行工具
  + `npm install -g gulp`
- 初始化 gulp 项目
- 创建任务 - gulpfile.js

### 4.3.基本使用

### 4.4.常用插件

- [编译 Less：gulp-less](https://www.npmjs.com/package/gulp-less)
- [创建本地服务器：gulp-connect](https://www.npmjs.com/package/gulp-connect)
- [合并文件：gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [最小化 js 文件：gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [重命名文件：gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [最小化 css 文件：gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
- [压缩html文件 gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html)
- [最小化图像：gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)


*****

## 5.Git

### 5.1.什么是GIT，什么是GITHUB

- GIT
- GITHUB

### 5.2.环境安装



### 5.3.GIT常用命令

*****

## 6.Markdown

https://guides.github.com/features/mastering-markdown/
https://help.github.com/articles/github-flavored-markdown/
https://help.github.com/articles/markdown-basics/

