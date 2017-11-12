# npm

> Node Package Manager - Node包管理器

- [npm 官方网站 ](https://www.npmjs.com/)   
- [中文网](https://npm.js.cn/)
- [npm 官方文档](https://docs.npmjs.com/)

## npm安装

- 安装完毕node.js后会自动安装npm

- 查看当前npm版本：`npm -v `   

  > 目前 node 最新是 9.0.0版本  稳定版是8.9.0版本 
  >
  > npm 对应的是  5.5.1 版本 了

- 更新 npm：`npm i npm@latest -g`       `i 就是 install, 用哪个都行`

  ```js
  //更新最新的 npm 
  // npm i npm -g   //  --global
  // npm i npm@latest -g 
  // npm i npm@9.0.0  -g
  ```

  ​

- 降级 npm:  `npm i npm@3.10.10 -g    // @后面写具体版本`    

## 如何使用

### 本地安装

1. 在 https://www.npmjs.com/ 网站找到需要的包

2. 在项目的**根目录**下，执行`npm install XXX`安装 (不推荐)

3. 通过 `require('包名');` 加载该模块

4. 注意：通过`npm install 包名`安装的包，会自动下载到当前目录下的`node_modules`目录下，如果该目录不存在，则创建，如果已存在则直接下载进去。

### 全局安装

>  什么是 npm 全局安装？

- `npm install 包名 -g   (--global)`  
- npm 全局安装指的是把包安装成了一个`命令行工具`。(全局使用其命令)

```javascript
  // 通过npm全局安装mime
  npm install mime -g

  //安装完毕后可以在命令行中直接使用
  mime a.txt 命令来查看对应的结果
```

## npm常用命令介绍

| bash命令                     | 效果              |
| -------------------------- | --------------- |
| npm                        | 查看常用命令          |
| npm i 包名 / npm install  包名 | 安装包             |
| npm un 包名/npm uninstall 包名 | 卸载安装包           |
| npm -v                     | 查看版本            |
| npm init -y                | 初始化package.json |

- 安装包的时候加-S，将依赖包保存在package.json里面。
- -D保存在dev（开发环境）

## "模块"（Modules）和"包"（Packages）的区别

- 模块可以是任何一个文件或目录（目录下可以有很多个文件），只要能被node.js通过require()即可。
- 在 node 的世界里,`每一个文件`都是一个模块;


- 包是一个文件或目录（目录下可以有多个文件）必须有一个`package.json`文件来描述，就可以是一个包。
- 总结: 模块包括包.

#### 补充:

node.js 错误调试：

1. 当开启服务后，在浏览器中输入地址，如果出现浏览问题，首先要先看 服务器控制台是否报错。如果报错，直接根据服务器报错进行排错。
2. 打开浏览器开发者工具中的 “网络” 部分，查看请求是否成功发出去了

- 看一下请求报文是不是和我们想的一样
- 看响应状态码

#### 淘宝镜像:

- npm毕竟要翻墙，用淘宝镜像是国内的10分钟同步一次。

```js
//淘宝镜像
npm config set registry https://registry.npm.taobao.org

//检测是否设置成功
npm config get registry
```

### cnpm

- 尽量不要用，可能会有bug

```
1. npm 安装 cnpm  
   npm i cnpm -g
2. 检查  cnpm   
    cnpm -v
3. 安装其他包:
   cnpm  i bootstrap -S
```

### yarn

```
1. npm 安装 yarn  
   npm i yarn -g
2. 检查  yarn   
    yarn -v
3. 安装其他包:
   yarn add underscore 
```

- 和npm是一个东西