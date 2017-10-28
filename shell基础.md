# shell基础

- 操作系统的命令行模式都叫shell
  + windwo 的shell叫cmd，win10出了powerShell。
  + linux的shell叫bash
- 一般都会学linux的shell，因为windows的shell没有意义，都是点点点操作。

## bash命令

- 以下命令都是运行在bash下，windows的命令行无效

```shell
$ pwd
# 查看当前路径

$ cd 路径
# 进入到某个文件路径

$ls
# 展示当前目录列表
$ ls -a # 展示所有文件（包括隐藏文件夹）
$ ls -l # 以列表形式展示文件，有详细内容

$ mkdir 路径名	#创建一个文件夹
$ rmdir 路径名	#删除一个空文件夹（只能删空的，所以没屌用）

$ touch 文件名
# 创建一个文件
$ rm 文件/文件夹名
# 可以删除文件或者文件夹名

$ mv 文件名 移动到的文件名
# 剪切一个文件，还可以剪切完重命名
$ mv index.css js/index.js
# 这样就将index.css 剪切到了js文件夹下并重命名为index.js

$ cp 文件名
# 复制一个文件

$cat 文件
# 查看一个文件
$less 文件
# 查看一个文件
```

