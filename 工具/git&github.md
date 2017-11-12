# git&github

### 什么是GIT

- 是一个源代码管理工具

- 源代码为什么要管理起来？

  - 你写的东西就叫源代码，第三方的库和框架都不算。


  - 让源代码可以被追溯，主要记录每次变更了什么，谁主导这次变化。
  - 人为的维护比较麻烦。
  - 便于版本的迭代

- GIT是Linux之父当年为了维护管理Linux的源代码写的一个工具

- Git 之前 很多使用 svn vss tfs hs ......

- github里所有项目都是用git管理的，所以前端必须掌握。


- [git官网](https://guides.github.com/)

## GIT安装

- linux&mac都不需要安装，系统内置。

- window需要下载 portableGit，并配置环境变量。

  * [git工具下载](http://www.softpedia.com/get/PORTABLE-SOFTWARE/Programming/Portable-Git.shtml)

  * 下载完解压到环境变量，配置GIT_HOME

  * 要全局使用的git.exe在bin文件夹里面，所以放到PATH中的应该是

  * ```
    PATH = %GIT_HOME%/bin
    ```

- ```ruby
  $ git --version
  ```

  - [git的可视化工具](https://www.sourcetreeapp.com/)
  - 下载后一直下一步就好了

### GIT命令操作

```shell
$ git init 
// 初始化一个本地的仓库就是在本地文件夹中添加了一个.git的文件夹用于记录所有的项目变更信息
$ git status
//查看本地仓储的变更状态
//用于查看本地仓储的状态,第一次查看，显示的是一坨没有被跟踪的文件.

$ git status -s 
// -s 是输出简要的变更日志

$ git add
$ git add --all
//添加本地暂存（托管）文件 add+文件名
//可以将一个/所有没有被跟踪的文件添加到跟踪列表
```

> 类似于node_modules这种性质的文件是不应该被跟踪

- 添加本地GIT忽略清单文件

  - 在代码库文件夹的根目录添加一个**.gitignore**文件

  - 此文件用于说明忽略的文件有哪些

  - ```
    node_modules
    ```

    * 直接写文件名就忽略了


- 提交被托管的文件变化到本地仓储

- git commit

  - 将本地的变化提交的本地的仓库文件夹归档

  - 一般在有了一个小单元的整体变化后再**提交**

  - ```shell
    $ git commit -m '第一次提交'
    ```

    + 必须写-m 后面加版本信息，git要求必须有提交日志


- 对比两个版本之间的差异
  - git diff
  - 可以用于对比当前状态和版本库中状态的变化
- 查看提交日志
  - git log 
  - 可以查看提交日志
- 回归到指定版本
  - git reset --hard加哈希值前六位
- 其他所有的命令都可以通过 git help查看
- 为仓储添加远端（服务器端）地址
- 将本地仓储的提交记录推送到远端的master分支
- 拉取远端master分支的更新记录到本地

## GITHUB

> 就是一个git服务器提供商

> 全球最大同性交友网站

> 社交化编程

[官网](https://github.com/)



1. 功能

   * 托管开源的项目都是免费的
   * 那么闭源的肯定就收费了，贵的一p

2. 如何使用

   * 注册，有邮箱就行。
   * 按着步骤走创建一个空的免费仓库
   * 在code的那一栏会出现教你用git提交代码的教程

3. 初体验

   - cd到你的git仓库。

   - 执行

     + ```shell
       git init
       git add --all
       get commit -m "提交一次代码"
       ```

     + 接下来就可以将这个git仓库链接github

   - 把仓库的地址复制下来，通过git命令绑定远端地址

     - ```shell
       git remote add origin http://你的仓库地址
       ```

     - git remore add 远端仓库的别名  github仓库的地址

     - 完成后**再 git remore**一次就会看到有一个**master**仓库创建出来

     - ```shell
       git push -u origin master
       //  push  -u是为了传输的更快 master 是主分支的意思
       ```

     - 通过push推送到github仓库

   - 接下来会让你输入github的用户名和密码

   - 这步之后就可以在github页面中看到你commit的内容了。

     - 从远端拉仓库过来

     - ```shell
       git pull origin master   //回车
       ```

     - 可以获取github远端仓库的文件，不用用户名密码。

4. Gist

   - github导航栏中
   - 可以记录一些常用的代码片段，并且发布到github共享。
   - 你也可以在上面搜索别人的一些好代码
   - 现在需要翻墙了

5. 通过github创建博客

   - [github的教程](https://pages.github.com)


   - ```
     git branch //查看当前版本的分支
     git branch gh-pages //新建一个叫gh-pages 的分支
     git checkout gh-pages //切换到gh-pages的分支
     git push -u origin gh-pages//将这个仓库推送到远端地址
     ```

   - 输入用户名密码，这样github就有两个仓库了。

     + gh-pages是github上一个特殊的分支
     + 通过这个分支可以在网上搭建一个网页，直接预览。

   - 创建好gh-pages仓库后，通过网络直接预览

   - 自己的github名字.github.io/项目名称

     - [我的地址](zzc5464.github.io/wjs)
     - 上面只是随便放了个静态网页
     - 下面介绍一款博客工具

6. HEXO

   - [官网](https://hexo.io)

   - 作用

     - 方便的搭建一个个人博客

   - 安装

     - ```shell
       $ npm install hexo-cli -g
       ```

   - 命令

     - ```shell
       $ hexo init 博客名称（blog）   // 初始化
       ```

     - 会给你创建一个叫blog的文件夹，包含三个目录

       - themes（主题，你可以下载官网的各种主题）
       - source （我们写的文章，md文件）
       - scaffolds（脚手架，不要管它）

     - cd 到 blog文件夹

     - ```shell
       $ npm install //下载它需要的包
       $ hexo serve //打开4000端口
       ```

     - 接下来就可以在localhost访问这个博客了

     - 要放到github上需要生成一个静态页

       - ```shell
         $ hexo generate
         ```

       - 生成好的页面在public文件夹中

       - 将这一整个文件和github文件绑定