# 服务器

> 能够提供某种服务的机器（计算机）称为服务器
>
> 能够提供某种服务的人称为服务机

## 服务器软件

> 使计算机具备提供某种服务能力的应用软件，称为服务器软件，
> 通过安装相应的服务软件，然后进行配置后就可以使计算具备了提供某种服务的能力。

常见的服务器软件有：

1. 文件服务器：Server-U、FileZilla、VsFTP等（FTP是File Transfer Protocol文件传输协议）；
2. 数据库服务器：oracle、mysql、SQL server、DB2、ACCESS等；
3. 邮件服务器：Postfix、Sendmail等；
4. **HTTP服务器**：Apache、Nginx、IIS、Tomcat、NodeJS等；



## 服务器类型

1. 按**服务类型**可分为：文件服务器、数据库服务器、邮件服务器、Web服务器等；
2. 按**操作系统**可分为：Linux服务器、Windows服务器等；
3. 按**应用软件**可分为 Apache服务器、Nginx 服务器、IIS服务器、Tomcat服务器、weblogic服务器、WebSphere服务器、boss服务器、 Node服务器等；





## HTTP服务器

即网站服务器，主要提供文档(文本、图片、视频、音频)浏览服务，一般安装Apache、Nginx服务器软件。

HTTP服务器可以结合某一编程语言处理业务逻辑，由此进行的开发，通常称之为**服务端开发**。 

常见的运行在服务端的编程语言包括 php、java、.net、Python、Ruby、Perl等。  



## 服务器总结

1. 服务器说白了就是计算机，通过安装了某些软件，就可以提供某些特定的服务器。
2. 根据服务器软件的功能，名称，安装的系统这些不同的标准，可以对服务器划分成不同的类型。
3. HTTP服务器主要提供网站浏览服务，通常需要结合某种编程语言进行开发，我们通常称之为服务器开发。
4. 专业的服务器与计算机的区别
   1. 稳定性：服务器要求7*24不间断运行。
   2. 性能：服务器能够同时响应更多客户端的请求。
   3. 价格：服务器价格通常比普通计算机贵很多。


# 客户端

> 具有向服务器**索取服务**能力的终端，叫做客户端。

+ 客户端：电脑、平板、手机安装了客户端软件，就可以称为客户端
+ 客户端：安装客户端软件，**索取服务**的一方
+ 服务器：安装服务器软件，**提供服务**的一方



## 客户端软件

浏览器===>索取**网站服务浏览**的软件

迅雷===>索取文件下载服务的软件

铁路12306====>索取火车票订购服务

今日头条====>索取新闻头条服务



对于前端工程师而言，主要接触到的客户端软件就是**浏览器**，当然也可能会涉及大一些app开发。

以浏览器为宿主环境，结合 HTML、CSS、Javascript等技术，而进行的一系列开发，通常称之为**前端开发**。

# 软件架构

> 软件架构可以分为BS架构与CS架构

## CS架构

Client/Server架构，即客户端/服务器架构。是大家所熟悉的软件体系结构。需要安装对应的客户端软件，才能获取响应的服务。

常见的CS架构：

​	QQ、LOL、微信等

特点：

+ 需要安装才是使用
+ 性能高效，使用更加稳定和流畅
+ 开发和维护难度更大。
+ 需要更新
+ 需要兼容操作系统。



## BS架构

Broswer/Server架构，即浏览器/服务器架构。随着Internet的兴起，对CS结构的一种变化的结构。用户只需要安装浏览器即可。

+ 不需要安装，只需要浏览器即可。
+ 相比CS架构，性能相对较差，没有那么流畅和稳定。
+ 开发维护方便。
+ 不需要更新
+ 不用兼容操作系统。但是需要兼容浏览器。



# 网络基础

```javascript
//思考：我写的代码，放到服务器后，同学们是如何访问到我的页面的？
```

## ip地址

所谓IP地址就是给每个连接在互联网上的主机分配的一个32位地址。(就像每部手机能正常通话需要一个号码一样)

通过ip就可以找到具体的某一台计算机。

例 `192.168.1.110`

查看本机IP地址 `ping`、`ipconfig`、`ifconfig`（linux）

```javascript
ping 192.168.1.110  //查看和某个同学的电脑是否连通
```

## 域名

由于IP地址基于数字，不方便记忆，于是便用域名来代替IP地址，域名是一个IP地址的“面具”

查看域名对应的IP地址 `ping`

```javascript
ping jd.com  //可以获取到京东的ip
```

## DNS服务器

DNS（Domain Name System）因特网上作为域名和IP地址相互映射的一个分布式数据库， 能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。

简单的说就是记录IP地址和域名之间对应关系的服务。

查找优先级 本机hosts文件、DNS服务器

ipconfig /flushdns 刷新DNS



![](image/05.png)



## 端口

端口号是计算机与外界通讯交流的出口，每个端口对应不同的服务。

现实生活中，银行不同的窗口办理不同的业务。

查看端口占用情况 netstat -an

常见端口号 80、8080、3306、21、22



## 本地hosts

> Hosts是一个没有扩展名的系统文件，可以用记事本等工具打开，其作用就是将一些常用的网址域名与其对应的IP地址建立一个关联“数据库”，当用户在浏览器中输入一个需要登录的网址时，系统会**首先自动从Hosts文件中寻找对应的IP地址**，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交DNS域名解析服务器进行IP地址的解析。

```javascript
//hosts文件的地址：C:\Windows\System32\drivers\etc
//在浏览器中输入taobao.com的执行过程。
```

![](image/06.png)



# 搭建HTTP服务器

## phpStudy介绍

> phpStudy是一个PHP调试环境的程序集成包。
> 该程序包集成最新的Apache+PHP+MySQL+phpMyAdmin,安装非常的简单

![](./image/phpstudy.png)



## phpStudy的安装

安装phpStudy，解压双击安装(**非中文路径**)，其它默认安装。

**推荐就安装在默认的目录下，一定不能有中文，否则肯定启动不起来。**

![](image/install.png)



## phpStudy的错误解决

如果phpStudy启动发生错误，参数下列几点。

### 关闭iis服务器

如果发现服务器启动不成功，很大原因是端口被占用了，因为windows默认会有一个iis服务器，只需要把iis服务器给禁用了即可。

```javascript
//控制面板-->程序-->程序与功能-->启用或关闭windows功能
```

![](image/iis.png)



### 提示缺少vc9 库文件

在提供的ajax资料库中找到**phpStudy运行库**， 根据自己电脑操作系统的位数安装对应的vc9运行库即可。

![](image/vc9.png)



### 关闭防火墙

如果希望系统自己的服务器能够被别人访问。需要关闭防火墙。

```javascript
//控制面板--->系统和安全--->Windows 防火墙--->启动或者关闭windows防火墙
```

![](image/fhq.png)

## phpStudy的配置

### 修改网站目录与默认首页

![](image/index.png)

+ 默认首页一般不用修改，业界规范就是index.html作为默认的首页。
+ 修改网站目录时，网站目录一定不能中文，不然apache启动会失败。



### 虚拟主机配置

在一台web服务器上，我们可以通过配置虚拟主机，然后分别设定根目录，实现对多个网站的管理。

具体步骤如下：



**1.找到http.conf文件**

找到470行，去掉`#`号注释

```javascript
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```



**2.找到`httpd-vhosts.conf`文件**

在目录：D:\phpStudy\Apache\conf\extra下找到httpd-vhosts.conf文件

```javascript
# 默认的虚拟主机
<VirtualHost _default_:80>
  DocumentRoot "C:\www\study"
  <Directory "C:\www\study">
    Options +Indexes +FollowSymLinks +ExecCGI
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>
</VirtualHost>

# Add any other Virtual Hosts below
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\show"
    #域名
    ServerName show.com
    #完整域名
    ServerAlias www.show.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>
    
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\api"
    #域名
    ServerName api.com
    #完整域名
    ServerAlias www.api.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\study"
    #域名
    ServerName study.com
    #完整域名
    ServerAlias www.study.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>


```

# PHP基础

> 文件以.php后缀结尾，所有程序包含在`<?php 这里是代码 ?>`
> 避免使用中文目录和中文文件名 
>
> php页面无法直接打开需要运行在服务器环境当中

***注意：学习php的目的是辅助学习ajax，因为我们需要了解一点后台的知识，千万不要本末倒置的跑去学习php语法。*** 



## php初体验

> webstorm对于php的支持并不友好，没有高亮显示，但是也支持代码提示，功能比较微弱，如果需要专业的提示和高亮，需要下载phpstorm。

[phpstrorm下载地址](http://www.jetbrains.com/phpstorm/)



```php
<?php
  	//echo 相当于document.write
    echo "hello world";
?>
```

输入中文乱码问题：如果使用echo输出中文，会乱码。

***在php的语法中，末尾必须加分号，不然就报错了（最后一行可以不加分号）***

```php
<?php
    //content-Type:text/html;返回内容是一个HTML文档，这样设置后，就能识别HTML标签了。
    //charset=utf-8 设置编码集
    header("content-Type:text/html;charset=utf-8");
    echo "hello world";
    echo "<br/>";
    echo "大家好，我是胡聪聪";
?>
```



```javascript
//思考：浏览器访问html文件与访问php文件时，过程是怎么样的？
```



## 变量

> php是一门弱类型语法，变量的类型可以随意改变。
> 变量其实就是存储数据的容器

**变量的命名规则**

```php
//1. 不需要关键字进行声明，变量在第一次赋值的时候被创建。
//2. 必须以$符号开始
//3. $后面的命名规则与js的变量命名规则一致。
$name = "胡聪聪";
echo $name;
```



## 数据类型

### 简单数据类型

**字符串** 

```php
$str = "胡聪聪";
echo $str;
```

**整数** 

```php
$num = 100;
echo $num;
```

**浮点型** 

```php
$float = 11.11;
echo $float;
```

**布尔类型** 

```php
$flag = true;
//当布尔类型值为true时，输出1
echo $flag;
$flag = false;
//当布尔类型为false时，输出空字符串
echo $flag;
```

**php的拼串** 

```php
//1. 在php中，+号只有算数的功能，并不能拼串
//2. 在php中，拼串使用.
$name = "胡聪聪";
echo "大家好，我是" . $name . "，今年18岁";
```

**php中的单引号与双引号**

```php
//1. 字符串的定义可以使用单引号，也可以使用双引号
$name = "胡聪聪";
$desc = '很帅';
//2. 在单引号中，完全当做字符看待
//3. 在双引号中，能够识别变量。如果有变量格式的字符串，可以直接解析

$name = "胡聪聪";//胡聪聪
echo $name;
$desc = '很帅';
echo $desc;//很帅

$str = '$name 很帅';//$name 很帅
echo $str;

$str = "$name 很帅";//胡聪聪 很帅
echo $str;
```



### 数组

> 在php中，数组分为两种，索引数组和关联数组

**索引数组（类似与JS中的数组）**

```php
$arr = array("张飞","赵云","马超");
echo $arr;//echo只能打印基本数据类型
echo $arr[0];//张飞
```

**关联数组（类似与JS中的对象）** 

```php
//属性名必须用引号引起来
$arr = array("name"=>"zhangsan", "age"=>18);
echo $arr["name"];
```

**输出语句** 

```php
//1. echo 输出简单数据类型
//2. print_r 输出数据结构，一般用于输出复杂类型。
print_r($arr);//print_r是一个函数，不要忘记小括号
//3. var_dump 输出完整的数据结构，包括类型，一般用于精准调试
var_dump($arr);
```



### 对象

> 在php以及其他高级语言中，都有类的概念，表示一类对象，跟js中构造函数类似。

**对象我们学习过程中用不到，了解即可。无需深究**

```php
//定义一个类（类似js的构造函数）
class Person {
  public $name = "小明";
  public $age = 12;
  private $sex = "男";
}

$zs = new Person;
print_r($zs);//打印对象的结构信息
echo $zs->name;//对象中取值用 ->
echo $zs->age;
echo $zs->sex;//私有属性，无法获取
```

### 函数

```php
<?php
    header("content-Type:text/html;charset=utf-8");
    //php中函数的语法与js中函数的语法基本一样，不同点在于
    //1. 函数名大小写不敏感
    //2. 函数的参数可以设置默认值
    function sayHello ($name="周杰伦") {
        echo "大家好，我是$name";
        echo "<br>";
    }
    sayHello();//不传参数，会使用默认值
    sayHello("胡聪聪");//传参数，默认值不生效，和less差不多。
?>
```



## 语句

### 判断语句

基本上来说，所有语言的if..else语法都是一样

```php
$age = 17;
if ($age >= 18) {
  echo "终于可以看电影了,嘿嘿嘿";
} else {
  echo "哎，还是回家学习把";
}
```



### 循环语句

**遍历索引数组** 

```php
$arr = array("张三", "李四", "王五", "赵六", "田七", "王八");
//获取数组的长度： count($arr)
for($i = 0; $i < count($arr); $i++) {
  echo $arr[$i];
  echo "<br>";
}
```

**遍历关联数组** 

```php
//遍历关联数组
$arr = array(
  "name"=>"zs",
  "age"=>18,
  "sex"=>20
);
foreach($arr as $key => $value) {
  echo $key . "=" . $value . "<br>";
}
```

## 表单处理

> 表单（form）：表单用于收集用户输入信息，并将数据提交给服务器。是一种常见的与服务端数据交互的一种方式

```javascript
//1. action：指定表单的提交地址
//2. method:指定表单的提交方式，get/post，默认get
//3. input的数据想要提交到后台，必须指定name属性，后台通过name属性获取值
//4. 想要提交表单，不能使用input:button 必须使用input:submit
```

**php获取表单数据** 

```
 //$_GET是系统提供的一个变量，是一个数组，里面存放了表单通过get方式提交的数据。
 //$_POST是系统提供的一个变量，是一个数组，里面存放了表单通过post方式提交的数据。
```

**get与post的区别** 

```javascript
//1. get方式
	//1.1 数据会拼接在url地址的后面?username=hcc&password=123456
	//1.2 地址栏有长度限制，因此get方式提交数据大小不会超过4k
//2. post方式
	//2.1 数据不会在url中显示，相比get方式，post更安全
	//2.2 提交的数据没有大小限制

//根据HTTP规范，GET用于信息获取，POST表示可能修改变服务器上的资源的请求
```

### 文件上传

**html要求** 

```javascript
1. 文件上传的提交方式必须是post方式
2. 需要给form指定enctype="multipart/form-data"
3. 指定name属性，后台才能获取到
```



**php相关**

- 文件上传时，`$_GET`与`$_POST`都无法获取到文件信息，通过`$_FILES`才能获取到，这是一个数组。
- 上传文件时，文件会临时保存在服务器上，如果文件最终没有保存，那么临时文件会被删除，保证服务器安全。
- `sleep(10)`可以让代码延迟10秒钟才执行。
- `move_uploaded_file($path, $newPath);`可以保存临时图片

```php
$path = $_FILES['upload']['tmp_name'];
$newPath = "./uploads/test.png";
//第一个参数：临时文件的路径
//第二个参数：保存的文件路径
move_uploaded_file($path, $newPath);

echo "<img src='./uploads/test.png'>";
```



## PHP常用函数

```javascript
//获取数组的长度
echo count($arr);
//判断数组是否包含某个key
echo array_key_exists("name", $arr);
//判断数组是否包含某个值
echo in_array("zs", $arr);
```



## 动态页面

> 静态页面：页面的内容和结构都是写死，不会变化的，是是实实在在存在与服务器上的一个html页面。
>
> 动态页面：页面的内容会根据数据库中的数据变化，存在与服务器端的是一个php或者jsp页面，用户访问时，会实时的进行改变。

### 使用php动态渲染页面

```php
<?php
  //这个属性是可以通过数据库进行获取的
  $person = array(
    "name"=>"胡聪聪",
    "gender"=>"男1",
    "hobby"=>"女1"
  )
?>
<p>姓名：<span><?php echo $person['name'];  ?></span></p>
<p>性别：<span><?php echo $person['gender']; ?></span></p>
<p>爱好：<span><?php echo $person['hobby'] ?></span></p>
```

以前很长一段时间的开发模式就是这样的，前端工程师先把html页面写好，后端程序员把html页面后缀改成php页面，然后将数据渲染出来。

### include

> include （或 require）语句会获取指定文件中存在的所有文本/代码/标记，并复制到使用 include 语句的文件中。包含文件很有用，如果您需要在网站的多张页面上引用相同的 PHP、HTML 或文本的话。

```php
$arr = array('张三','李四','王五','赵六');
include '04-render-for.html';
```

【案例：京东分类页】

【案例：京东首页】



## 总结

我们使用php动态渲染页面时，有很多比较麻烦的地方。

+  在前端写好页面以后，需要后台进行修改，意味这后端程序员也需要懂前端的知识，其实渲染的工作应该交给前端来做。
+  前端没有写好页面的话，后端无法开始工作，需要等待前端的页面完成之后才能开始工作，拖延项目的进度。
+  这种渲染，属于同步渲染，页面加载速度比较慢，会影响后面的内容能够的渲染速度。

【演示：同步渲染】



# http协议

> 协议是指计算机通信网络中两台计算机之间进行通信所必须共同遵守的规定或规则
> HTTP协议，即超文本传输协议(Hypertext transfer protocol)。是一种详细规定了浏览器和服务器之间互相通信的规则，HTTP协议分为**请求** 和**响应** 两个部分组成。

## 请求与请求报文

**get请求的请求报文详解** 

```javascript
//--------------------------请求行--------------------------------
// GET  请求方式
// /day02/01.php?username=hucc&password=123456    请求路径+参数（注意点）
// HTTP/1.1 HTTP的版本号
GET /day02/01.php?username=hucc&password=123456 HTTP/1.1

//--------------------------请求头--------------------------------
// Host:主机地址
Host: www.study.com
// HTTP1.1版本默认开启，建立过连接后，TCP连接不会断开，下次连接可以继续使用（底层，不用管）
Connection: keep-alive
//chrome浏览器自己增加的，不用管
Upgrade-Insecure-Requests: 1
//浏览器的代理字符串（版本信息）
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36
//浏览器端可以接受的类型。
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,`*/*`;q=0.8
//从哪个页面发出的请求
Referer: http://www.study.com/day02/01-login.html
//检查浏览器支持的压缩方式
Accept-Encoding: gzip, deflate, sdch
//浏览器支持的语言，优先中文。
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6

//----------------------------请求体-------------------------------------
//get请求没有请求体，但是参数会拼接到请求行中
```



**POST请求的请求报文** 

```javascript
//-----------------------请求行---------------------------------------------
POST /day02/01.php HTTP/1.1

//-----------------------请求头--------------------------------------------
Host: www.study.com
Connection: keep-alive
//传递的参数的长度。
Content-Length: 29
Cache-Control: max-age=0
Origin: http://www.study.com
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36
//内容类型：表单数据，如果是post请求，必须指定这个属性。
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,`*/*`;q=0.8
Referer: http://www.study.com/day02/01-login.html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6

//------------------------请求体------------------------------------------
username=hucc&password=123456
```



**GET请求与POST请求的对比** 

+ GET请求没有请求体，因为GET请求的参数拼接到地址栏中了
+ POST请求有请求体，就是传递的参数
+ POST请求需要指定content-type属性。



## 响应与响应报文

```javascript
//---------------------状态行（响应行）-------------------------------
//HTTP/1.1  HTTP版本
//200 响应的状态
	//200表示成功
	//304表示读缓存
	//404表示找不到资源
	//500表示服务端错误
HTTP/1.1 200 OK

//----------------------响应头-----------------------------------------------
Date: Thu, 22 Jun 2017 16:51:22 GMT
Server: Apache/2.4.23 (Win32) OpenSSL/1.0.2j PHP/5.4.45
X-Powered-By: PHP/5.4.45
Content-Length: 18
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
//内容类型，告诉浏览器该如何解析响应结果
Content-Type: text/html;charset=utf-8
//-----------------------响应体------------------------------------------------
用户登录成功
```



通常来说，我们不会用抓包工具来查看请求和响应，太麻烦了，可以直接使用谷歌浏览器来查看请求报文和响应报文。

谷歌浏览器会对报文进行一定的格式化，看起来虽然不是原生的报文，但是使用起来更加的方便简洁。



# AJAX

> 即 Asynchronous [e'sɪŋkrənəs] Javascript And XML， AJAX 不是一门的新的语言，而是对现有技术的综合利用。 本质是在HTTP协议的基础上以异步的方式与服务器进行通信。

## 同步与异步

同步和异步概念：

同步: 指的就是事情要一件一件做。等做完前一件才能做后一件任务

异步: 不受当前任务的影响，两件事情同时进行，做一件事情时，不影响另一件事情的进行。

编程中：异步程序代码执行时不会阻塞其它程序代码执行,从而提升整体执行效率。

![](image/async_time.png)

网页异步应用：

1. 验证你的用户名是否已经存在（一边输入，一边获取你的信息，和后台比对）。
2. 百度搜索提示，及相关内容展示（一边输入，一边找出了你可能要的内容）。
3. 新浪微博评论（异步加载）。


XMLHttpRequest可以以异步方式的处理程序。

## XMLHttpRequest
> 浏览器内建对象，用于在后台与服务器通信(交换数据) ， 由此我们便可实现对网页的部分更新，而不是刷新整个页面。这个请求是异步，即在往服务器发送请求时，并不会阻碍程序的运行，浏览器会继续渲染后续的结构。



### 发送get请求

XMLHttpRequest以异步的方式发送HTTP请求，因此在发送请求时，一样需要遵循HTTP协议。

```javascript
//使用XMLHttpRequest发送get请求的步骤
//1. 创建一个XMLHttpRequest对象
var xhr = new XMLHttpRequest;//构造函数没有参数的情况,括号可以省略
//2. 设置请求行
//第一个参数:请求方式  get/post
//第二个参数:请求的地址 需要在url后面拼上参数列表
xhr.open("get", "08.php?name=hucc");
//3. 设置请求头
//浏览器会给我们默认添加基本的请求头,get请求时无需设置
//4. 设置请求体
//get请求的请求体为空,因为参数列表拼接到url后面了
xhr.send(null);
```

+ get请求,设置请求行时,需要把参数列表拼接到url后面
+ get请求不用设置请求头
+ get请求的请求体为null



### 发送post请求

```javascript
var xhr = new XMLHttpRequest;
//1. 设置请求行 post请求的参数列表在请求体中
xhr.open("post", "09.php");
//2. 设置请求头, post请求必须设置content-type,不然后端无法获取到数据
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//3. 设置请求体
xhr.send("name=hucc&age=18");
```

+ post请求,设置请求行时,参数列表不能拼接到url后面

+ post必须设置请求头中的content-type为application/x-www-form-urlencoded

+ post请求需要将参数列表设置到请求体中.



### 获取响应

HTTP响应分为3个部分，状态行、响应头、响应体。

```javascript
//给xhr注册一个onreadystatechange事件，当xhr的状态发生状态发生改变时，会触发这个事件。
xhr.onreadystatechange = function () {
  if(xhr.readyState == 4){
    //1. 获取状态行
    console.log("状态行:"+xhr.status);
    //2. 获取响应头
    console.log("所有的相应头:"+xhr.getAllResponseHeaders());
    console.log("指定相应头:"+xhr.getResponseHeader("content-type"));
    //3. 获取响应体
    console.log(xhr.responseText);
  }
}
```

**readyState** 

> readyState:记录了XMLHttpRequest对象的当前状态

```javascript
//0：请求未初始化（还没有调用 open()）。
//1：请求已经建立，但是还没有发送（还没有调用 send()）。
//2：请求已发送，正在处理中
//3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
//4：响应已完成；您可以获取并使用服务器的响应了。(我们只需要关注状态4即可)
```



### 案例

【判断用户名是否存在】

【用户登录案例】

【聊天机器人案例】

## 数据交互

> 浏览器端只是负责用户的交互和数据的收集以及展示，真正的数据都是存储在服务器端的。我们现在通过ajax的确可以返回一些简单的数据（一个字符串），但是在实际开发过程中，肯定会会设计到大量的复杂类型的数据传输，比如数组、对象等，但是每个编程语言的语法都不一样。因此我们会采用通过的数据交换格式（XML、JSON）来进行数据的交互。



### XML

**什么是XML**

- XML 指可扩展标记语言（EXtensible Markup Language）
- XML 是一种标记语言，很类似 HTML
- XML 的设计宗旨是传输数据，而非显示数据
- XML 标签没有被预定义。您需要自行定义标签。



**语法规范**

+ 第一行必须是版本信息
+ 必须有一个根元素（有且仅有一个）
+ 标签不可有空格、不可以数字或.开头、大小写敏感
+ 不可交叉嵌套，都是双标签，如果是单标签，必须闭合
+ 属性双引号（浏览器自动修正成双引号了）
+ 特殊符号要使用实体
+ 注释和HTML一样

```xml
<students>
    <student>
        <name>张三</name>
        <age>18</age>
        <gender>男</gender>
        <desc>路人甲</desc>
    </student>
    <student>
        <name>李四</name>
        <age>20</age>
        <gender>男</gender>
        <desc>路人乙</desc>
    </student>
</students>
```

**php获取xml文件的内容**

```php
//注意，如果需要返回xml数据，需要把content-type改成text/xml,不然浏览器以text/html进行解析。
header('content-type:text/xml;charset=utf-8');
//用于获取文件的内容
//参数：文件的路径
$result = file_get_contents("data.xml");
echo $result;
```

**html解析xml**

```javascript
//获取服务端返回的xml数据，需要使用xhr.responseXML，这是一个document对象，可以使用DOM中的方法查找元素。
var data = xhr.responseXML;
//获取所有的学生
var students = data.querySelectorAll("student");
```

缺点：虽然可以描述和传输复杂数据，但是其解析过于复杂并且体积较大，所以实现开发已经很少使用了。

### JSON数据

JSON(JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。它基于 ECMAScript 规范的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。

+ 数据在名称/值对中
+ 数据由逗号分隔(最后一个健/值对不能带逗号)
+ 花括号保存对象，方括号保存数组
+ 键使用双引号

```javascript
    var obj = {a: 'Hello', b: 'World'}; //这是一个对象，注意键名也是可以使用引号包裹的
    var json = '{"a": "Hello", "b": "World"}'; //这是一个 JSON 字符串，本质是一个字符串
```
**JSON数据在不同语言进行传输时，类型为字符串，不同的语言各自也都对应有解析方法，需要解析完成后才能读取**

#### php处理json

- php关联数组==> json

```php
// php的关联数组
$obj = array(
  "a"=>"hello",
  "b"=>"world",
  "name"=>"胡聪聪"
);
//json字符串
$json = json_encode($obj);
echo $json;
```

- json===>php对象

```php
$json = '{"a": "Hello", "b": "World"}';//json字符串
//第一个参数：json字符串
//第二个参数：
	//false，将json转换成对象(默认)
	//true：将对象转换成数组(推荐)
$obj = json_decode($json,true);
echo $obj['a'];

//通过json文件获取到的内容就是一个json字符串。
$data = file_get_contents("data.json");
//将json转换成数组
$result = json_decode($data, true);
print_r($result);
```




####  JS处理json

+ JS对象 ==> JSON字符串 JSON.stringify(obj)
```javascript
    //obj是一个js对象
    var obj = {a: 'Hello', b: 'World'}
    //result就变成了一个json字符串了
    var result = JSON.stringify(obj);// '{"a": "Hello", "b": "World"}'
```


+ JSON字符串 ==> JS对象  JSON.parse(obj)
```javascript
    //json是一个json字符串
    var json = '{"a": "Hello", "b": "World"}';
    //obj就变成了一个js对象
    var obj = JSON.parse(json);// {a: 'Hello', b: 'World'}
```



使用json进行数据传输

思考：

1. js有一个对象，如何发送到php后台
2. php中有一个对象，如何发送到前台。



【案例：获取表格数据.html】

### eval方法

eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。eval的参数是一个字符串，这个字符串是需要执行的表达式或者语句。

```javascript
console.log(eval("{}"));//undefined，因为{}备当成了代码块
console.log(eval("({})"));//obj，因为{}用()引起来了。

//使用这个方法，也可以将一个json字符串转换成js对象。
var json = '{"name":"zs", "age":18, "sex":"男"}';
var obj = eval("(" + json + ")");
console.log(obj);
```

注意：eval函数的功能非常的强大，但是实际使用的情况并不多。

- eval形式的代码难以阅读
- eval形式的代码无法打断点，因为本质还是还是一个字符串
- 在浏览器端执行任意的 JavaScript会带来潜在的安全风险，恶意的JavaScript代码可能会破坏应用




## 兼容性处理

```javascript
var xhr = null;
if(XMLHttpRequest){
  //现代浏览器
  xhr = new  XMLHttpRequest();
}else{
  //IE5.5支持
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```



## 封装ajax工具函数

> 每次发送ajax请求，其实步骤都是一样的，重复了大量代码，我们完全可以封装成一个工具函数。

```javascript
//1. 创建xhr对象
//2. 设置请求行
//3. 设置请求头
//3. 设置请求体
//4. 监听响应状态
//5. 获取响应内容
```

### 参数提取

| 参数名      | 参数类型     | 描述      | 传值                        | 默认值                                    |
| -------- | -------- | ------- | ------------------------- | -------------------------------------- |
| type     | string   | 请求方式    | get/post                  | 只要不传post，就是get                         |
| url      | string   | 请求地址    | 接口地址                      | 如果不传地址，不发送请求                           |
| async    | boolean  | 是否异步    | true/fase                 | 只要不传false，那就是true，异步请求                 |
| data     | object   | 请求数据    | `{key:value,key1:value2}` | 需要把这个对象拼接成参数的格式 uname=hucc&upass=12345 |
| dataType | string   | 返回的数据类型 | xml/json/text             | text                                   |
| success  | function | 响应成功时调用 | -                         | -                                      |
| error    | function | 响应失败时调用 | -                         | -                                      |



### 参数检测

```javascript
 //要求参数obj必须传递，否则直接不发送请求
if(!obj || typeof obj !== "object"){
  return;
}
//如果type传递的是post，那就发送post请求，否则发送get请求
var type = obj.type == "post"?"post":'get';
var url = obj.url;
if(!url){
  return;
}
//只有当async传递了false，才会发送同步请求，不然只发送异步请求
var async = obj.async == false? false:true;
```



### 完整版

```javascript
var $ = {
  ajax: function (options) {
    //如果options参数没有传递，直接返回。
    if (!options || typeof options !== "object") {
      return;
    }
    
    //处理默认参数
    //如果参数不是post，那就默认为get
    var type = options.type == "post" ? "post" : "get";
    //如果没有传url，那就传当前地址
    var url = options.url || location.pathname;
    //如果参数不是false，那就默认是true，发异步请求
    var async = options.async == false ? false : true;
    
    var params = this.getParams(options.data);
    
    var xhr = new XMLHttpRequest();
    
    //设置请求行
    if (type == "get") {
      url = url + "?" + params;
    }
    xhr.open(type, url, async);
    
    //设置请求头
    if (type == "post") {
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    }
    //设置请求参数
    xhr.send(params);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          /*根据响应头的content-type属性指定方法接收到的内容*/
          var contentType = xhr.getResponseHeader('content-type');
          var data = null;
          if (contentType.indexOf('json') > -1) {
            data = JSON.parse(xhr.responseText);
          } else if (contentType.indexOf('xml') > -1) {
            data = xhr.responseXML;
          } else {
            data = xhr.responseText;
          }
          /*执行成功函数*/
          options.success && options.success(data);
        } else {
          options.error && options.error(xhr.responseText);
        }
        
      }
    }
  },
  getParams: function (obj) {
    //将obj对象转换成参数
    //将对象转换成参数列表
    if (!obj) {
      return null;
    }
    var arr = [];
    for (var k in obj) {
      arr.push(k + "=" + obj[k]);
    }
    return arr.join("&");
  }
  
}
```



【登录案例】





## jQuery中的ajax方法

> jQuery为我们提供了更强大的Ajax封装

### $.ajax

参数列表

| 参数名称       | 描述       | 取值                  | 示例                                |
| ---------- | -------- | ------------------- | --------------------------------- |
| url        | 接口地址     |                     | url:"02.php"                      |
| type       | 请求方式     | get/post            | type:"get"                        |
| timeout    | 超时时间     | 单位毫秒                | timeout:5000                      |
| dataType   | 服务器返回的格式 | json/xml/text(默认)   | dataType:"json"                   |
| data       | 发送的请求数据  | 对象                  | data:{name:"zs", age:18}          |
| beforeSend | 调用前的回调函数 | function(){}        | beforeSend:function(){ alert(1) } |
| success    | 成功的回调函数  | function (data) {}  | success:function (data) {}        |
| error      | 失败的回调函数  | function (error) {} | error:function(data) {}           |
| complete   | 完成后的回调函数 | function () {}      | complete:function () {}           |



使用示例：

```javascript
$.ajax({
  type:"get",//请求类型
  url:"02.php",//请求地址
  data:{name:"zs", age:18},//请求数据
  dataType:"json",//希望接受的数据类型
  timeout:5000,//设置超时时间
  beforeSend:function () {
    //alert("发送前调用");
  },
  success:function (data) {
    //alert("成功时调用");
    console.log(data);
  },
  error:function (error) {
    //alert("失败时调用");
    console.log(error);
  },
  complete:function () {
    //alert("请求完成时调用");
  }
});
```
【案例：登录案例.html】

### 其他api(了解)

```javascript
//$.post(url, callback, [dataType]);只发送post请求
//$.get(url, callback, [dataType]);
//$.getJSON(url, callback);
//$.getScript(url,callback);//载入服务器端的js文件
//$("div").load(url);//载入一个服务器端的html页面。
```





### 接口化开发

请求地址即所谓的接口，通常我们所说的接口化开发，其实是指一个接口对应一个功能， 并且严格约束了**请求参数** 和**响应结果** 的格式，这样前后端在开发过程中，可以减少不必要的讨论， 从而并行开发，可以极大的提升开发效率，另外一个好处，当网站进行改版后，服务端接口进行调整时，并不影响到前端的功能。



#### 获取短信验证码接口

**需求文档(产品)** 

```javascript
//总需求：点击发送按钮，向服务端发送请求
//需求1：格式校验
  //1. 手机号码不能为空   如果为空提示"手机号不能为空"
  //2. 手机号码格式必须正确,     提示"请输入正确的手机号码"
//需求2：点击发送时，按钮显示为"发送中",并且不能重复提交请求
//需求3：根据不同的响应结果，进行响应。
  //1. 如果接口调用成功
      //如果响应代码为100，倒计时
      //如果响应代码为101，提示手机号重复
  //2. 如果接口调用失败，告诉用户"服务器繁忙，请稍候再试"
```

**接口文档**

```javascript
//接口说明：获取短信验证码
//接口地址：getCode.php
//请求方式：get
//接口传参：mobile 手机号
//返回类型  json
//接口返回：{"code":"101","msg":"手机号码存在", "mobile":"18511249258"}
        //code 当前业务逻辑的处理成功失败的标识  100:成功   101:手机号码存在
        //msg  当前系统返回给前端提示
        //mobile  当前的手机号码
```



#### 注册接口

**表单序列化**

jquery提供了一个`serialize()`方法序列化表单，说白就是将表单中带有name属性的所有参数拼成一个格式为`name=value&name1=value1`这样的字符串。方便我们获取表单的数据。

```javascript
//serialize将表单参数序列化成一个字符串。必须指定name属性
//name=hucc&pass=123456&repass=123456&mobile=18511249258&code=1234
$('form').serialize();

//serializeArray将表单序列化成一个数组，必须指定name属性
//[{name:"name", value:"hucc"},{name:"pass", value:"123456"},{name:"repass", value:"123456"},{name:"mobile", value:"18511241111"}, {name:"code", value:"1234"}]
$('form').serializeArray();
```

**jquery的ajax方法，data参数能够直接识别表单序列化的数据`data:$('form').serializeArray()`**

```javascript
$.post({
  url:"register.php",
  data:$('form').serializeArray(),
  dataType:'json',
  success:function (info) {
    console.log(info);
  }
});
```



**需求文档**

```javascript
//注册功能
//总需求：点击注册按钮，向服务端发送请求
//需求1:表单校验
  //1.1 用户名不能为空，否则提示"请输入用户名"
  //1.2 密码不能为空，否则提示"请输入密码"
  //1.3 确认密码必须与密码一直，否则提示"确认密码与密码不一致"
  //1.4 手机号码不能为空，否则提示"请输入手机号码";
  //1.5 手机号码格式必须正确，否则提示"手机号格式错误"
  //1.6 短信验证码必须是4位的数字，否则提示"验证码格式错误"
//需求2：点击注册按钮时，按钮显示为"注册中...",并且不能重复提交请求
//需求3：根据不同响应结果，处理响应
  //3.1 接口调用成功
    //100 提示用户注册成功，3s后跳转到首页
    //101 提示用户"用户名hucc已经存在"
    //102 提示用户"验证码错误"
  //3.1 接口调用失败，提示"服务器繁忙，请稍后再试",恢复按钮的值
```

**接口文档**

```javascript
//接口说明：注册
//接口地址：register.php
//请求方式：post
//接口传参：name:用户名 pass:密码 code:验证码  mobile:手机号
//返回类型  json
//接口返回：{"code":"100","msg":"注册成功","name":"huccc"}
        //code 当前业务逻辑的处理成功失败的标识  100:成功  101:用户存在 102:验证码错误
        //msg  当前系统返回给前端提示
        //name: 注册的用户名
```











# 模板引擎

> 是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档。

## 为什么要使用模板引擎

我们通过ajax获取到数据后，需要把数据渲染到页面，在学习模板引擎前，我们的做法是大量的拼接字符串，对于结构简单的页面，这么做还行，但是如果页面结构很复杂，使用拼串的话**代码可阅读性非常的差，而且非常容易出错，后期代码维护也是相当的麻烦。** 

【演示：使用拼串进行渲染的缺点.html】



## 常见的模板引擎

BaiduTemplate：http://tangram.baidu.com/BaiduTemplate/
velocity.js：https://github.com/shepherdwind/velocity.js/
ArtTemplate：https://github.com/aui/artTemplate

artTemplate是使用最广泛，效率最高的模板引擎，需要大家掌握。



## artTemplate的使用

[github地址](https://github.com/aui/art-template)

[中文api地址](https://aui.github.io/art-template/docs/)

### artTemplate入门

**1.引入模板引擎的js文件** 

```javascript
<script src="template-web.js"></script>
```

**2.准备模板** 

```html
<!--
  指定了type为text/html后，这一段script标签并不会解析，也不会显示。
-->
<script type="text/html" id="myTmp">
  <p>姓名：隔壁老王</p>
  <p>年龄：18</p>
  <p>技能：查水表</p>
  <p>描述：年轻力气壮</p>
</script>
```

**3.准备数据**

```javascript
//3. 准备数据,数据是后台获取的，可以随时变化
var json = {
  userName:"隔壁老王",
  age:18,
  skill:"查水表",
  desc:"年轻气壮"
}
```

**4.将模板与数据进行绑定**

```javascript
//第一个参数：模板的id
//第二个参数：数据
//返回值：根据模板生成的字符串。
var html = template("myTmp", json);
console.log(html);
```

**5.修改模板**

```html
<script type="text/html" id="myTmp">
  <p>姓名：{{userName}}</p>
  <p>年龄：{{age}}</p>
  <p>技能：{{skill}}</p>
  <p>描述：{{desc}}</p>
</script>
```



**6.将数据显示到页面**

```javascript
var div = document.querySelector("div");
div.innerHTML = html;
```



### artTemplate语法

**if语法**

```html
{{if gender='男'}}
  <div class="man">
{{else}}
  <div class="woman">
{{/if}}
```

**each语法**

```html
<!--
  1. {{each data}}  可以通过$value 和 $index获取值和下标
  2. {{each data v i}}  自己指定值为v，下标为i
-->
{{each data v i}}
<li>
  <a href="{{v.url}}">
    <img src="{{v.src}}" alt="">
    <p>{{v.content}}</p>
   </a>
 </li>
{{/each}}
```

```javascript
//如果返回的数据是个数组，必须使用对象进行包裹，因为在{{}}中只写书写对象的属性。
var html = template("navTmp", {data:info});
```

【案例：京东导航】

【案例：祝愿墙】

【案例：什么值得买】

# 瀑布流案例

## 封装jQuery瀑布流插件

```javascript
//特点分析：
//1. 跟以前将的瀑布流不一样的是，这次的瀑布流固定版心为1200px
//2. 瀑布流固定摆放5列，每一列的宽度固定为232px。

//思路分析：
//1. 计算每一列之间的缝隙
//2. 初始化一个数组，用户存储每一列的高度 [0,0,0,0,0]
//3. 查找数组的最小列，每次都把图片定位到最小列的位置
//4. 更新数组最小列的高度（加上定位过来的图片的高度）
```



代码参考：

```javascript
$.fn.waterfall = function () {
  var $box = $(this);
  var $item = $box.children();
  var boxWidth = $box.width();//父盒子的宽度
  var itemWidth = 232;//每个盒子固定宽度为232
  var columns = 5;//固定摆放5列
  var gap = (boxWidth - columns * itemWidth) / (columns - 1);//缝隙的宽度 10
  var arr = [0, 0, 0, 0, 0]; //初始化数组
  $item.each(function () {
    //查找最小列
    var min = arr[0];
    var minIndex = 0;
    for (var i = 0; i < arr.length; i++) {
      if (min > arr[i]) {
        min = arr[i];
        minIndex = i;
      }
    }
    //设置位置
    $(this).css({
      left: minIndex * (itemWidth + gap),
      top: min
    });
    //更新数组
    arr[minIndex] = min + $(this).outerHeight() + gap;
  });
}
```



## 瀑布流完整版

```javascript
//需求分析：
//1. 页面刚开始，没有任何一张图片。因此需要从通过ajax获取图片
//2. 使用模版引擎将获取到的数据渲染到页面
//3. 因为图片路径是从服务端获取的，加载需要时间，需要等待图片加载完成后才能使用瀑布流进行布局。
//4. 给window注册scroll事件，当触底时，需要动态的加载图片。
//5. 加载时，显示加载中的提示信息，并且要求不能重复发送ajax请求
//6. 当服务端返回图片数量为0时，提示用户没有更多数据。
```



接口文档

```javascript
//接口说明：瀑布流分页数据
//接口地址：data.php
//请求方式：get
//接口参数：page 当前是第几页    pageSize 当前页需要显示多少条
//返回类型  json
//返回数据：
{
  page: 2,
  items:[
    {path: "./images/1.jpg",text:'这是描述信息'},
    {path: "./images/2.jpg",text:'这是描述信息'}
    {path: "./images/2.jpg",text:'这是描述信息'}
  ]
}
	//page   下一页的页码
	//items  返回当前页的数据
		//path 图片地址
		//text 文字
```

# 综合案例

## 数据库初始化

```sql
/* 
1. phpstudy-->MYSQL管理器-->MySQL-Front-->根据下图连接信息连接数据库
2. 选择test数据库，点击sql编辑器，根据下列sql语句，生成数据。
*/
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `sex` varchar(20) NOT NULL DEFAULT '男',
  `academy` varchar(400) NOT NULL DEFAULT '前端与移动开发学院',
  `introduce` varchar(1000) NOT NULL DEFAULT '暂无',
  `createTime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `user` VALUES ('1', '张三01', '男', '前端与移动开发学院', '暂无', '2017-05-26 16:39:40');
INSERT INTO `user` VALUES ('2', '张三02', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('3', '张三03', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('4', '张三04', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('5', '张三05', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('6', '张三06', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('7', '张三07', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('8', '张三08', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('9', '张三09', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('10', '张三09', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('11', '张三10', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('12', '张三11', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('13', '张三12', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('14', '张三13', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
INSERT INTO `user` VALUES ('15', '张三14', '男', '前端与移动开发', '哈哈哈', '2017-05-26 16:40:27');
```

![](image/mysql01.png)



## 页面初始化

- 导航组件
- panel组件
- table组件
- 模态框组件
- 表单组件

## bootstrap-paginator分页插件的使用

> Bootstrap Paginator是一款基于Bootstrap的js分页插件，功能很丰富，

[github地址](https://github.com/lyonlai/bootstrap-paginator)



```javascript
$("#pagintor").bootstrapPaginator({
  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
  currentPage:1,//当前页
  totalPages:10,//总页数
  size:"small",//设置控件的大小，mini, small, normal,large
  onPageClicked:function(event, originalEvent, type,page){
    //为按钮绑定点击事件 page:当前点击的按钮值
  }
});
```





# 同源与跨域

## 同源

### 同源策略的基本概念

> 1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。
> 同源策略：最初，它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个相同"。

```javascript
协议相同
域名相同
端口相同
```

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。

```javascript
//http://www.example.com/dir2/other.html：同源
//http://example.com/dir/other.html：不同源（域名不同）
//http://v2.www.example.com/dir/other.html：不同源（域名不同）
//http://www.example.com:81/dir/other.html：不同源（端口不同）
```

### 同源策略的目的

> 同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想：某用户是网站A的管理员，用户只要登录网站A并且执行删除用户的操作就可以把网站A中的其他用户删除。当这个用户访问了网站A之后，又访问了一个网站B，这时候如果网站B可以获取到网站A的cookie，那么网站B就能伪造该用户的身份去访问网站A，即网站B也可以执行相同的操作去删除网站A中的其他用户，那这样带来的后果是不堪设想的。

[CSRF攻击（跨站请求伪造）,](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

**因此同源策略是必须的，如果cookie可以在不同源的网站中共享，那么互联网将毫无安全可言。**



### 同源策略的限制范围

> 随着互联网的发展，“同源策略”越来越严格，目前，如果非同源，以下三种行为都将收到限制。

```javascript
//1. Cookie、LocalStorage 和 IndexDB 无法读取。
//2. DOM 无法获得。
//3. AJAX 请求不能发送。
```

虽然这些限制是很有必要的，但是也给我们日常开发带来不好的影响。比如实际开发过程中，往往都会把服务器端架设到一台甚至是一个集群的服务器中，把客户端页面放到另外一个单独的服务器。那么这时候就会出现不同源的情况，如果我们知道两个网站都是安全的话，我们是希望两个不同源的网站之间可以相互请求数据的。这就需要使用到**跨域** 。

## 跨域

【演示跨域问题.html】

### jsonp

> JSONP(JSON with Padding)、可用于解决主流浏览器的跨域数据访问的问题。原理：服务端返回一个预先定义好的javascript函数的调用，并且将服务器的数据以该函数参数的形式传递过来，这个方法需要前后端配合。

`script` 标签是不受同源策略的限制的，它可以载入任意地方的 JavaScript 文件，而并不要求同源。类似的还有`img`和`link`标签

```html
<!--不受同源策略的标签-->
<img src="http://www.api.com/1.jpg" alt="">
<link rel="stylesheet" href="http://www.api.com/1.css">
<script src="http://www.api.com/1.js"></script>
```



#### jsonp演化过程1

php文件

```php
header("content-type:text/html;charset=utf-8");
echo "alert(1111)";
```

html文件

```html
<script src="http://www.api.com/testjs.php"></script>
```

原理：其实src的路径是什么文件不重要，无论引入js文件还是php文件，最后返回给浏览器的都是字符串，因此我们script标签是可以引入一个php文件的。



#### jsonp演化过程2

php文件

```php
header("content-type:text/html;charset=utf-8");
echo "var a = 118;";
```

html文件

```html
<script src="http://www.api.com/testjs.php"></script>
<script>
  //a打印出来了118
  console.log(a);
</script>
```

**我们现在做到了一件事情，从不同源的php文件中获取到了数据** 



缺点：获取数据的script标签必须写在使用的script标签的前面，必须保证先有数据才能对数据进行渲染。

#### jsonp演化过程3

php代码

```php
header("content-type:text/html;charset=utf-8");
$arr = array(
    "name"=>"zs",
    "age"=>18
);
$result = json_encode($arr);
//这是一段js函数的调用的代码，$result就是我们想要的数据
echo "func($result)";
```

js代码

```html
<script>
  function func(data) {
    console.log(data);
  }
</script>
<script src="http://www.api.com/testjs.php"></script>
```



缺点：后端必须知道前端声明的方法的名字，后端才能调用。



#### jsonp演化过程4

php代码

```php
header("content-type:text/html;charset=utf-8");
$arr = array(
    "name"=>"zs",
    "age"=>18
);
$result = json_encode($arr);
//这是一段js函数的调用的代码，$result就是我们想要的数据
echo $_GET['callback']."($result)";
```

javascript代码

```javascript
function fun(data) {
  console.log(data);
}
var button = document.querySelector("button");
button.onclick = function () {
  var script = document.createElement("script");
  script.src = "http://www.api.com/testjs.php?callback=fun";
  document.body.appendChild(script);
}
```



**说白了，jsonp的原理就是 借助了script标签不受同源策略的限制，在服务端返回一个函数的调用，将数据当前调用函数的实参。 在浏览器端，需要程序要声明一个函数，通过形参就可以获取到服务端返回的对应的值。** 



jsonp原理大家知道即可，不用太过于去纠结这个原理，因此jquery已经帮我们封装好了，我们使用起来非常的方便。

### jquery对于jsonp的封装

```javascript
//使用起来相当的简单，跟普通的get请求没有任何的区别，只需要把dataType固定成jsonp即可。
$.ajax({
  type:"get",
  url:"http://www.api.com/testjs.php",
  dataType:"jsonp",
  data:{
    uname:"hucc",
    upass:"123456"
  },
  success:function (info) {
    console.log(info);
  }
});
```

【案例：查询天气.html】

[天气查询api地址](https://www.jisuapi.com/api/weather/)

【案例：省市区三级联动.html】

[api地址](https://www.jisuapi.com/api/area/) 



# XMLHttpRequest2.0

> XMLHttpRequest是一个javascript内置对象，使得Javascript可以进行异步的HTTP通信。2008年2月，就提出了XMLHttpRequest Level 2 草案。

老版本的XMLHttpRequest的缺点：

```javascript
//1. 仅支持传输文本数据，无法传说二进制文件，比如图片视频等。
//2. 传输数据时，没有进度信息，只能提示完成与否。
//3. 受到了"同源策略"的限制
```



新版本的功能：

```javascript
//1. 可以设置timeout超时时间
//2. 可以使用formData对象管理表单数据
//3. 允许请求不同域名下的数据（跨域）
//4. 支持上传二进制文件
//5. 可以获取数据传输的进度信息
```

**注意：我们现在使用new XMLHttpRequest创建的对象就是2.0对象了，我们之前学的是1.0的语法，现在学习一些2.0的新特性即可。**  

## timeout设置超时

```javascript
xhr.timeout = 3000;//设置超时时间
xhr.ontimeout = function(){
  alert("请求超时");
}
```



## formData管理表单数据

> formData对象类似于jquery的serialize方法，用于管理表单数据

```javascript
//使用特点： 
//1. 实例化一个formData对象， new formData(form); form就是表单元素
//4. formData对象可以直接作为 xhr.send(formData)的参数。注意此时数据是以二进制的形式进行传输。
//5. formData有一个append方法，可以添加参数。formData.append("id", "1111");
//6. 这种方式只能以post形式传递，不需要设置请求头，浏览器会自动为我们设置一个合适的请求头。
```



代码示例：

```javascript
//1. 使用formData必须发送post请求
    xhr.open("post", "02-formData.php");
    
//2. 获取表单元素
var form = document.querySelector("#myForm");
//3. 创建form对象，可以直接作为send的参数。
var formData = new FormData(form);

//4. formData可以使用append方法添加参数
formData.append("id", "1111");

//5. 发送，不需要指定请求头，浏览器会自动选择合适的请求头
xhr.send(formData);
```



## 文件上传

> 以前，文件上传需要借助表单进行上传，但是表单上传是同步的，也就是说文件上传时，页面需要提交和刷新，用户体验不友好，xhr2.0中的formData对象支持文件的异步上传。

```javascript
var formData = new FormData();
//获取上传的文件，传递到后端
var file = document.getElementById("file").files[0];
formData.append("file", file);
xhr.send(formData);
```



## 显示文件进度信息

> xhr2.0还支持获取上传文件的进度信息，因此我们可以根据进度信息可以实时的显示文件的上传进度。

```javascript
1. 需要注册 xhr.upload.onprogress = function(e){} 事件，用于监听文件上传的进度.注意：需要在send之前注册。
2. 上传的进度信息会存储事件对象e中
3. e.loaded表示已上传的大小   e.total表示整个文件的大小
```



代码参考：

```javascript
xhr.upload.onprogress = function (e) {
  
  inner.style.width = (e.loaded/e.total*100).toFixed(2)+"%";
  span.innerHTML = (e.loaded/e.total*100).toFixed(2)+"%";
}

xhr.send(formData);
```

如果上传文件超过8M，php会报错，需要进行设置，允许php上传大文件。

![](image/php.png)



## 跨域资源共享(CORS)

### cors的使用

> 新版本的XMLHttpRequest对象，可以向不同域名的服务器发出HTTP请求。这叫做["跨域资源共享"](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing)（Cross-origin resource sharing，简称CORS）。

跨域资源共享（CORS）的前提

- 浏览器支持这个功能
- 服务器必须允许这种跨域。

服务器允许跨域的代码：

```php
//允许所有的域名访问这个接口
header("Access-Control-Allow-Origin:*");
//允许www.study.com这个域名访问这个接口
header("Access-Control-Allow-Origin:http://www.study.com");
```



### CORS的具体流程（了解）

1. 浏览器会根据**同源策略** 查看是否是跨域请求，如果同源，直接发送ajax请求。
2. 如果非同源，说明是跨域请求，浏览器会自动发送一条请求（**预检请求** ），并不会携带数据，服务器接受到请求之后，会返回请求头信息，浏览器查看返回的响应头信息中是否设置了`header('Access-Control-Allow-Origin:请求源域名或者*');`
3. 如果没有设置，说明服务器不允许使用cors跨域，那么浏览器不会发送真正的ajax请求。
4. 如果返回的响应头中设置了`header('Access-Control-Allow-Origin:请求源域名或者*');`,浏览器会跟请求头中的`Origin: http://www.study.com`进行对比，如果满足要求，则发送真正的ajax请求，否则不发送。
5. 结论：**跨域行为是浏览器行为，是浏览器阻止了ajax行为。服务器与服务器之间是不存在跨域的问题的**



### jsonp与cors的对比

- jsonp兼容性好，老版本浏览器也支持，但是jsonp仅支持get请求，发送的数据量有限。使用麻烦
- cors需要浏览器支持cors功能才行。但是使用简单，**只要服务端设置允许跨域，对于客户端来说，跟普通的get、post请求并没有什么区别。**
- 跨域的安全性问题：很多同学会觉得跨域能带来安全性问题，其实并不会，**因为跨域是需要服务端配合的** ，也就是说不论jsonp还是cors，如果没有服务端的允许，浏览器是没法做到跨域的。


【案例：图灵机器人】


### 其他的跨域手段（没卵用）

以下方式基本不用啊，了解即可：

1、顶级域名相同的可以通过domain.name来解决，即同时设置 domain.name = 顶级域名（如example.com）
2、document.domain + iframe
3、window.name + iframe
4、location.hash + iframe
5、window.postMessage()

[其他跨域方式](http://rickgray.me/2015/09/03/solutions-to-cross-domain-in-browser.html)






