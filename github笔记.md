# 版本控制工具

## 什么是版本控制系统？

版本控制系统（Version Control System）:是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。版本控制系统不仅可以应用于软件源代码的文本文件，而且可以对任何类型的文件进行版本控制。

常见的版本控制系统有：svn、cvs、git



## 为什么要有版本控制系统?

1. 在开发过程中，经常需要对一个文件进行修改甚至删除，但是我们又希望能够保存这个文件的历史记录，如果通过备份，那么管理起来会非常的复杂。
2. 在多人开发时，如果需要多人合作开发一个页面，那么修改以及合并也会非常的棘手。容易出现冲突。

## 版本控制系统分类

**本地版本控制系统**

本地版本控制系统就是在一台机器上，记录版本的不同变化，保证内容不会丢失

缺点：如果多人开发，每个人都在不同的系统和电脑上开发，没办法协同工作。

![](images/vcs.png)

**集中式版本控制系統** 

svn/cvs都是集中式的版本控制系统

1. 需要一个中央服务器来管理代码的的版本和备份
2. 所有的用户电脑都是从中央服务器获取代码或者是将本地的代码提交到中央服务器
3. 依赖与网络环境，如果连不上中央服务器，就无法提交和获取代码。
4. 如果中央服务器宕机，所有人都无法工作。

![](images/jzs.png)

**分布式版本控制系统** 

git是分布式的版本控制系统。

1. 需要一台服务器作为代码仓库
2. 每个用户电脑都是一个服务器，并且和代码仓库是镜像的，用户修改和获取代码都是提交到自己的服务器当中。
3. 不需要网络就可以进行工作。
4. 当连接网络时，用户可以选择将自己的服务器与代码仓库进行同步。

![](images/fbs.png)

# git

## git介绍

> Git是一款免费、开源的**分布式** **版本控制系统** ，用于敏捷高效地处理任何或小或大的项目。

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

## git安装

[下载地址](https://git-scm.com/download/win)

安装很简单，一直下一步即可。在任意的目录下右键，能够出现下图，表示安装成功了。

![](images/gitinstall.png)

git是用法方式主要有两种，

- git gui，即图形化界面的方式
- git bash，命令行的方式

**bash是linux系统的命令，因此学习git前，我们先学习一下bash** 



## 基本方法

1. 初始化git仓库`git init`
2. 查看当前git仓库的状态`git status`
3. 将文件添加到git的暂存区`git add 文件名`
4. 将文件由暂存区提交到仓库区`git commit -m '提交说明'`
5. 查看提交日子`git log`

```bash
# 初始化git仓库，会在当前目录生成一个隐藏文件夹 .git  不要去修改这个文件夹下的任意东西。
git init

# 查看git的状态 ,如果此时新建一个文件，那么这个文件是没有被追踪的，说白了git还没有管理这个新建的文件
git status 

# 让git管理这个新建的文件
git add index.html

# 让文件由暂存区提交到仓库区。此时文件才真正的被git管理了。
# 
# 如果提交日志乱码，右键-->options-->Text-->将编码改成utf-8

git commit -m '第一次提交'

# 查看提交日志
git log
```



## 配置邮箱和用户名

如果第一次使用git，会要求设置用户名和邮箱

```bash
# git config  user.name 你的目标用户名
# git config  user.email 你的目标邮箱名
# 这种配置方式只有在当前仓库生效
git config user.name hcc
git config user.email flycc@163.com

# 可以使用--global参数，配置全局的用户名和邮箱，这样别的git仓库就不需要重新配置了。
# 如果同时配置了局部的和全局的，那么局部的用户名和邮箱将会生效。
git config  --global user.name hucc
git config  --global user.email 111111@qq.com

# 查看配置信息
git config --list
```



## git的工作原理

![](images/gityl.png)



## git命令详解

### git add

- 作用：将文件由 工作区 添加到 暂存区，暂存文件
- 命令：`git add 文件名`
  - 例如： `git add index.html`
- `git add --all` 或者 `git add -A`（简写） 添加所有文件
- `git add a.txt b.txt` 同时添加两个文件
- `git add *.js` 添加当前目录下的所有js文件



### git checkout 文件名

- 作用：暂存区的内容恢复到工作区。
- `git checkout 1.txt` 将暂存区中1.txt文件恢复到工作区

### git commit

- 作用：将文件由 暂存区 添加到  仓库区
- `git commit -m "提交说明"`



### git status

- 作用：查看文件的状态


- 命令：`git status`
- 命令：`git stauts -s` 简化日志输出格式

### git log

- 作用：查看提交日志
- `git log` 只能查看当前head以及以前的日志
- `git log --oneline` 简洁的日志信息
- `git reflog` 查看所有的提交变更日志

### git reset

- 作用：版本回退，将代码恢复到已经提交的某一个版本中。
- `git reset --hard 版本号` 将代码回退到某个指定的版本(版本号只要有前几位即可)
- `git reset --hard head~1`将版本回退到上一次提交
  - ~1:上一次提交
  - ~2:上上次提交
  - ~0:当前提交

## git忽视文件

> 在仓库中，有些文件是不想被git管理的，比如数据的配置密码、写代码的一些思路等。git可以通过配置从而达到忽视掉一些文件，这样这些文件就可以不用提交了。

- 在仓库的根目录创建一个`.gitignore`的文件，文件名是固定的。
- 将不需要被git管理的文件路径添加到`.gitignore`中

```bash
# 忽视idea.txt文件
idea.txt

# 忽视.gitignore文件
.gitignore

# 忽视css下的index.js文件
css/index.js

# 忽视css下的所有的js文件
css/*.js

# 忽视css下的所有文件
css/*.*
# 忽视css文件夹
css
```

# git分支操作

分支就是科幻电影里面的平行宇宙，当你正在电脑前努力学习Git的时候，另一个你正在另一个平行宇宙里努力学习SVN。

如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，结果，你既学会了Git又学会了SVN！

![](images/fenzhi.png)



## **为什么要有分支？**

- 如果你要开发一个新的功能，需要2周时间，第一周你只能写50%代码，如果此时立即提交，代码没写完，不完整的代码会影响到别人无法工作。如果等代码写完再提交，代码很容易丢失，风险很大。
- 有了分支，你就可以创建一个属于自己的分支，别人看不到，也不影响别人，你在自己的分支上工作，提交到自己的分支上，等到功能开发完毕，一次性的合并到原来的分支。这样既安全，又不影响他人工作。
- 在工作过程中，经常会碰到**多任务并行开发** 的情况，使用分支就能很好的避免任务之间的影响。
- 其他版本工具比如svn，cvs中也有分支这个概念，但是这些工具中的分支操作非常的慢，形同摆设。

## 分支操作的命令

### 创建分支

- `git branch 分支名称`创建分支，分支中的代码，在创建时与主分支的内容完全相同。
- git在第一次提交时，就有了一个叫`master`的主分支。

### 查看分支

- `git branch`可以查看所有的分支，
- 在当前分支的前面会有一个`*`

### 切换分支

- `git checkout 分支名称`切换分支
- 在当前分支的任何操作，都不会影响到其他的分支，除非进行了分支合并。
- 切换分支之前，**必须保证代码已经提交了** 

### 创建并切换分支

- `git checkout -b 分支名称` 创建并切换分支

### 删除分支

- `git branch -d 分支名称` 可以删除分支
- 注意：不能在当前分支删除当前分支，需要切换到其他分支才能删除。
- 注意：`master`分支是可以删除的，但是不推荐那么做。

### 合并分支

- `git merge 分支名称` 将其他分支的内容合并到当前分支。
- 在`master`分支中执行`git merge dev` 将`dev`分支中的代码合并到`master`分支

## git分支的工作原理

![](images/git-branch.png)

## git合并冲突

- 对于同一个文件，如果有多个分支需要合并时，容易出现冲突。
- 合并分支时，如果出现冲突，只能手动处理，再次提交，一般的作法，把自己的代码放到冲突代码的后面即可。

# 远程仓库

所有的程序员都可以通过远程仓库来进行版本的共享，达到所有人的代码一致的效果。

## 远程仓库相关的命令

### git push

- 作用：将本地代码提交到远程仓库
- `git push 仓库地址 master` 在代码提交到远程仓库，注意master分支必须写，不能省略
- 例子：`git push git@github.com:hucongcong/test.git master` 如果第一次使用，需要填写github的用户名和密码

### git pull

- 作用：将远程的代码下载到本地
- `git pull 代码地址` 将远程的代码中master分支下载到本地
- 通常在push前，需要先pull一次。

### git clone

- 作用：克隆远程仓库的代码到本地
- `git clone 仓库地址 自定义本地仓库名` 将整个仓库克隆到本地

### git remote

每次push和pull操作都需要带上远程仓库的地址，非常的麻烦，我们可以给仓库地址设置一个别名

- `git remote add 仓库别名 仓库地址` 使用仓库别名替代仓库地址。仓库别名相当于一个js变量，仓库地址就是对应的值。
  - `git remote add hucc git@github.com:hucongcong/test.git` 设置了一个hucc的仓库别名，以后push和pull都可以不用仓库地址，而用hucc
- `git remote remove hucc` 删除hucc这个仓库别名。
- `git remote` 查看所有的仓库别名
- 如果使用了`git clone`命令从远程仓库获取下来的，那么这个本地仓库会自动添加一个 origin的远程地址，指向的就是克隆的远程地址。

## github

git与github没有直接的关系。

- git是一个版本控制工具。
- github是一个代码托管平台，是git的一个远程代码仓库。
- 将来工作时，公司会有自己的代码仓库。

[github官网](gittu://github.com/)

[开源中国-git](https://git.oschina.net/)

```bash
1. gitHub是一个面向开源及私有软件项目的托管平台，因为只支持git 作为唯一的版本库格式进行托管，故名gitHub。
2. github免费，代码所有人都能看到，但是只有你自己能修改。付费的可以隐藏。
```



在github上创建一个项目，获取到仓库的地址。然后就可以将本地的代码推送到远程的服务器上。

## SSH免密码登陆

每次push代码，都需要输入用户名跟密码，非常的麻烦。因此我们可以配置一个SSH免密码登陆。

- github为了账户的安全，需要对每一次push请求都要验证用户的身份，只有合法的用户才可以push
- 使用ssh可以实现免密码操作（不需要使用密码）

### SSH免密码登录配置

- 1 创建SSH Key：`ssh-keygen -t rsa`
- 2 在文件路径 `C:\用户\当前用户名\` 找到 `.ssh` 文件夹
- 3 文件夹中有两个文件：
  - 私钥：`id_rsa`
  - 公钥：`id_rsa.pub`
- 4 在 `github -> settings -> SSH and GPG keys`页面中，新创建SSH key
- 5 粘贴 公钥 `id_rsa.pub` 内容到对应文本框中
- 5 在github中新建仓库或者使用现在仓库，拿到`git@github.com:用户名/仓库名.git`
- 6 此后，再次SSH方式与github“通信”，不用输入密码确认身份了

## 使用github pages搭建博客

[GitHub Pages ](https://pages.github.com/)本用于介绍托管在 GitHub 的项目， 不过，由于他的空间免费稳定，用来做搭建一个博客再好不过了。

缺点：只能放静态页面，也就说github pages只能解析html、css、js，无法解析后端语言。

[用户名.github.io]  将来访问路径

博客搭建步骤：

1. 在本地工作目录使用git初始化 `git init`
2. 创建自己的博客项目
3. 将创建好的博客添加到暂存区 `git add [文件路径]`
4. 本地提交： `git commit -m "第一个博客"`
5. 在github上创建一个项目，项目名`用户名.github.io` 固定的
6. 提交到github：`git push github仓库地址 master`
7. 查看github中对应的仓库中，是不是提交到了
8. 访问：用户名.github.io

## hexo创建博客（了解）

### 安装步骤

```javascript
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

- 安装hexo

```javascript
npm install -g hexo

hexo -v  # 查看hexo的版本信息
```

- 初始化博客

```javascript
# 新建一个目录  blog
hexo init  # 初始化
```

- 生成静态页面

```javascript
hexo generate   # 生成静态页面	
hexo g          # 生成静态页面（简写）
```

- 启动服务

```javascript
hexo server   # 启动服务
```

- 访问站点

```javascript
http://localhost:4000/  # 通过这个地址就可以访问了
```

### hexo常见命令

[hexo中文文档](https://hexo.io/zh-cn/docs/)

### 博客格式

```javascript
---
title: 我的第一篇博客//(注意冒号后面有一个空格不能丢。)
date: 2017-10-28 01:12:29 //指定博客的日期
tags: 
  - 学习
  - 随笔
  - 心情
categories: 
  - javascript
---
# 我是大标题
这后面的内容就跟普通的markdown文件没什么区别
  
```



### 发布配置

安装hexo的部署工具`npm install hexo-deployer-git --save`

修改`_config.yml`文件

```javascript
# Site
title: 网站标题
subtitle: 子标题
description: 无
author: HUCC
language: zh-CN
timezone:

# 发布配置
deploy:
  type: git
  repo: github仓库地址
  branch: master
```

使用`hexo d`发布博客