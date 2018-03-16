# ajax
- 有两种方向
 + 自己调用自己服务器接口文件的时候，使用ajax。
 + 调用别人给你的功能接口的时候用jsonp

## 服务器概念
- 和我们电脑一样，都是计算机。
- 服务器提供的功能：下载、传输网页、邮件。。。
- 它也有自己的操作系统，比如客户端的windows
- 跟客户端不同的是应用程序，服务器端的应用程序是  提供 服务的。

## HTTP服务器
- 即网站服务器，主要提供文档(文本、图片、视频、音频)浏览服务。
- HTTP服务器可以结合某一编程语言处理业务逻辑，由此进行的开发，通常称之为服务端开发。
- 常见的服务端编程语言包括 PHP、Jsp、Asp、Python、Ruby、Perl等 。

### 协议

- 英语就是一种协议
- 你听得懂，我听得懂就叫协议。
- json和xml就是计算机世界通用的协议

## 网络基础

1. IP地址
- 所谓IP地址就是给每个连接在互联网上的主机分配的一个32位地址。类似手机号码.
- 就是通过编号找计算机的
2. 域名
- 域名是一个IP地址的“面具”，由于IP地址基于数字，不方便记忆，于是便用域名来代替IP地址。
- 可以好几个域名对应一个ip地址
3. DNS服务
- 互联网上有13台计算机专门提供解析功能。
- DNS记录了 IP 地址和域名的映射（对应）关系。
4. 端口
- IP地址是找计算机，端口就是精确的找哪个应用程序。

- 端口号是计算机与外界通讯交流的出口，每个端口号对应不同的服务。

- 端口号由数字组成，其取值范围从0 到 65535 

- 查看端口占用情况 netstat –an

- 常见端口号 80、8080、3306、21、22

## 安装WampServer
- 安装wampserver，和普通软件安装无差别，除指定安装路径外，其它默认。
- 让电脑同时扮演客户端和服务器

## iframe
- 在还没有XHR的时候，就用这个标签实现异步加载。
```
    //普通格式
    <iframe src="./myFrame.html"></iframe>

-----------------------分割线--------------------------------------------------
    <form action="./data.php" method="post" target="myframe">
        用户名：<input type="text" name="username"><br>
        密码：<input type="password" name="password">
        <input type="submit" value="提交">
    </form>
    <iframe width="0" height="0" frameborder="0" name="myframe"></iframe>

data.php内容
<?php 
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    //连接数据库
    //添加数据当中
    
    $flag = 1;
    
    if($flag == 1){
        echo '用户名'.$username.'|密码'.$password;
    }else{
        echo 0;
    }
?>
<script type="text/javascript">
    parent.document.getElementById('showInfo').innerHTML = '注册成功！';
</script>
```
- 就是给主页面套一个子页面。

## 原生ajax
> - 即 Asynchronous Javascript And XML

- AJAX 不是一门的新的语言，而是对现有持术的综合利用

- 本质是在HTTP协议的基础上以异步的方式与服务器进行通信
## 使用
1. 定义一个xhr对象，做一下和ie的兼容。
 + 实例化一个XHR对象
2. 调用一个open方法，有三个参数 （准备，但还没做）
 + 用什么方式去提交这个数据
 + 调用地址
 + 异/同步  true/false
3. 执行一下回调
4. 发送
5. 以上四步完成才来做回调函数里的步骤
```javascript
            //初始化
            var xhr = null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            //准备好了
            var url = './check.php?username='+username+"&password="+password;
            xhr.open('get',url,false);
            xhr.send(null);
            xhr.onreadystatechange = function(){
              
            }

            
```
- 在回调中做的处理
1. xhr.readyState == 4 
 + 表示已经准备好了
2. xhr.status == 200
 + 表示一切ok
3. xhr.responseText
 + 这里就是我们需要的数据，json格式的
 + xhr.responseXML返回的就是XML格式的数据。
```
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        alert(1);
                        var data = xhr.responseText;
                        if(data == 1){
                     
                        }else if(data == 2){
                          
                        }
                    }
                };
```

### 详解
1. readyState 一共有五个状态 0-4
 + 刚创建完xhr对象为状态0
 + open 和 send 为 1
 + 总的来说就是回调函数内部执行234状态,外面则是0和1;
2. 意思
 + 0:xhr对象创建
 + 1: 已经准备好发送请求
 + 2:已经发送完成
 + 3:已经获取数据,还未解析
 + 4:获取了数据并且解析完了
3. xhr.status == 200 表示访问完成,还有很多其他状态比如404/503...
4. var data = xhr.responseText; 这个就是我们要的data


## ajax的应用
- 百度、快递、360天气....很多使用场景
- 我们要做的就是使用ajax向后端接口请求数据，然后通过回调的数据动态的在我们页面渲染出来。

## 原生ajax的封装
- 思路：
  1. 创建ajax对象
  2. 配置open参数，包含：get/post、url、同/异步
  3. 配置send参数
  4. 回调参数的处理，成功/失败
```JS
function ajax(data){
    //第一步：创建xhr对象
    var xhr = null;
    if(window.XMLHttpRequest){//标准的浏览器
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //第二步：准备发送前的一些配置参数
    var type = data.type == 'get'?'get':'post';
    var url = '';
    if(data.url){
        url = data.url;
        if(type == 'get'){
            //处理url缓存
            url += "?" + data.data + "&_t="+new Date().getTime();
        }
    }
    var flag = data.asyn == 'true'?'true':'false';
    xhr.open(type,url,flag);

    //第三步：执行发送的动作
    if(type == 'get'){
       xhr.send(null);
    }else if(type == 'post'){
       xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
       xhr.send(data.data);
    }

    //第四步：指定回调函数
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(typeof data.success == 'function'){
                    var d = data.dataType == 'xml'?xhr.responseXML:xhr.responseText;
                    data.success(d);
                }
            }else{
                if(typeof data.failure == 'function'){
                    data.failure();
                }
            }
        }
    }

}
```
- 通过传输一个对象来使用封装的ajax
```
        btn.onclick = function(){
            var param = {
                url:'xx.com',
                type:'get',
                dataType:'json',
                success:function(data){
                    alert(data);
                }
            };
            ajax(param);
        }
```

## jQuery的ajax语法
- $.ajax({});
```
            $.ajax({
                url:"xx.php",
                //传过来的数据类型:json,html,script....
                dataType:"text",
                type:"get",
                success:function(data){
                    alert(data);
                },
                error:function(e){
                    console.log(e);
                }
            });
```
## 跨域问题
- 跨域就是要获取到别的主机，比如一些功能接口的api
- 详见jsonp.md

### jsonp在jq中写法
```
    $.ajax({
        type : "get",
        async: false,
        url : "./jsonp.php",
        dataType : "jsonp",
        jsonp: "qwe",
        //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback:"",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名(类似：jQuery1102016820125747472048_1450147653563(["zhangsan", "lisi", "wangwu"]);)
        success : function(data){
            console.log(data);
        },
        error:function(){
            console.log('fail');
        }
    });
```
