# [WebSocket](http://www.cnblogs.com/wei2yi/archive/2011/03/23/1992830.html)

## 是什么

> H5新的api，简单的描述一下。就是新一代的ajax。它可用于客户端、服务器端。而且有一个优秀的第三方API，名为`Socket.IO`。

## 可以做什么

- WebSocket API最伟大之处在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息。
- 区别：
  + WebSocket并不限于以Ajax(或XHR)方式通信，因为Ajax技术需要 **客户端发起请求**，而WebSocket服务器和客户端可以彼此相互推送信息； **XHR受到域的限制，而WebSocket允许跨域通信**。
  + Ajax技术很聪明的一点是没有设计要使用的方式。WebSocket为指定目标创建，用于双向推送消息。
  + webSocket使用的是ws和wss协议

## 用法

```js
// new 一个webSocket对象，参数为wesocket协议
// wss协议表示安全的webSocket协议
var socket = new WebSocket('ws://localhost:8080'); 

// 打开Socket 
socket.onopen = function(event) { 

  // 发送一个初始化消息
  socket.send('I am the client and I\'m listening!'); 

  // 监听消息
  socket.onmessage = function(event) { 
    console.log('Client received a message',event); 
  }; 

  // 监听Socket的关闭
  socket.onclose = function(event) { 
    console.log('Client notified socket has closed',event); 
  }; 

  // 关闭Socket.... 
  //socket.close() 
};

```

1. 实例化webSocket对象，传入ws协议的地址参数
2. 其他的on事件都是为发送的信息注册处理函数
3. 采用消息的方式触发，速度更快，用户体验更好

## webSocket协议

> 支持服务器与浏览器互相推送消息的协议

- 与http协议的异同
  - http是单向推送
  - 两个都是基于TCP协议的
- 为什么要出ws/wss协议？
  - http数据包头部往往非常大，真正需要的数据可能只有几k
  - 单向获取数据只能通过polling，设定一个循环的时间向服务器拉数据，老的资源还会再拉一次才展示新资源造成带宽浪费

## 不支持的情况

> IE浏览器目前不支持WebSocket通信。如果你的客户端不支持WebSocket通信，下面有几个后备方案供你使用：

### 替换的技术

> **Flash技术** —— Flash可以提供一个简单的替换。 使用Flash最明显的缺点是并非所有客户端都安装了Flash，而且某些客户端，如iPhone/iPad，不支持Flash。
>
> **AJAX Long-Polling技术** —— 用AJAX的`long-polling`来模拟WebSocket在业界已经有一段时间了。它是一个可行的技术，但它不能优化发送的信息。也就是说，它是一个解决方案，但不是最佳的技术方案。
>
> 由于目前的IE等浏览器不支持WebSocket，要提供WebSocket的事件处理、返回传输、在服务器端使用一个统一的API，那么该怎么办呢？幸运的是，Guillermo Rauch创建了一个Socket.IO技术。

## 下载socket.io

[下载地址](https://github.com/socketio/socket.io.git)

- 引包

`<script src="http://cdn.socket.io/stable/socket.io.js"></script>`

- 使用

```js
// 创建Socket.IO实例，建立连接
var socket= new io.Socket('localhost',{ 
  port: 8080 
}); 
socket.connect(); 

// 添加一个连接监听器
socket.on('connect',function() { 
  console.log('Client has connected to the server!'); 
});

// 添加一个连接监听器
socket.on('message',function(data) { 
  console.log('Received a message from the server!',data); 
});

// 添加一个关闭连接的监听器
socket.on('disconnect',function() { 
  console.log('The client has disconnected!'); 
}); 

// 通过Socket发送一条消息到服务器
function sendMessageToServer(message) { 
  socket.send(message); 
}

```

1. new 一个socket实例，调用`socket`链接服务器
2. 添加链接监听`socket.on` 参数为connect
3. 添加信息监听`socket.on` 参数为message
4. 添加关闭监听`socket.on` 参数为disconnect
5. 通过`socket.send` 发送消息给服务器

> 这个库的核心事件就是`on` 围绕着消息做事件触发判断。