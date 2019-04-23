# JWT

> `JSON web token`  ，是为了在网络应用环境间**传递标识**而执行的一种**基于JSON的开放标准** `RFC 7519`
>
> 特别适用于分布式站点的单点登录`SSO`场景, `JWT`的声明一般被用来在浏览器和服务器间传递被认证的用户身份信息
>
> 还可加入一些额外信息
>
> 可以直接被用于认证，也可以进行加密。

## 为何使用

为了更好的实现分布式站点 `SSO`登录场景，并且` JSON`天生适合传输数据，使用简单。

## Session的限制

基于 cookie识别用户，如果被截获，容易造成跨站攻击。

每个用户认证后，都要将信息储存在内存中，用户量大了将增加服务器的开销。

由于是存在内存中，所以用户必须每次都请求同一台服务器才能认证，限制了负载均衡能力。

## token 鉴权的流程

登录请求后服务器生成一个 `token` 给浏览器

浏览器在每次请求时都在请求头中带上` token` 发送给服务器

服务器验证 token 返回相应数据

服务器须支持`CORS` 「 跨站源资源共享 」策略

## JWT 的构成

- JWT 的样子

```js
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

它由头部`header` 荷载信息 `payload` 签证 `signature` 组成由`.` 进行分割

`header.payload.signature`

### header
头部承载两部分信息：
1. 声明类型，这里是jwt
2. 声明加密的算法 通常直接使用 HMAC SHA256

类似于

```
{
  'typ': 'JWT',
  'alg': 'HS256'
}
```

然后将头部进行`base64`加密**该加密是可以对称解密的**,构成了第一部分。

### payload

载荷就是存放有效信息的地方,这些有效信息包含三个部分

1. 标准中注册的声明 

   - iss: jwt签发者
   - sub: jwt所面向的用户
   -  aud: 接收jwt的一方
   - exp: jwt的过期时间，这个过期时间必须要大于签发时间
   - nbf: 定义在什么时间之前，该jwt都是不可用的.
   - iat: jwt的签发时间
   - jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。


2. 公共的声明 

3. 私有的声明

公私有信息都可以包含一些业务相关的内容，但不建议放敏感信息，因为都可以解密。

同样给`payload` 进行 base64加密，生成第二部分。

### signature

由三个部分组成，header 、payload 加密后的信息分别作为第一、二部分。

第三部分为`secret` ，是服务端生成的私钥。然后将这三部分根据 header中声明的加密方式进行加密。

最终，一个由` header payload signature `组合成的 `jwt` 就生成了。

## 应用

一般是在请求头里加入`Authorization` ，并加上`Bearer`标注 + 服务器返回的 `token`

```js
axios.defaults.headers['Authorization'] = 'Bearer ' + token;
```

## JWT流程

![](./md-imgs/JWT流程.png)



## 总结

### 优点

- 通用性。得益于json的通用性，所以JWT是可以进行跨语言支持的，像`JAVA,JavaScript,NodeJS,PHP`等很多语言都可以使用。

- 便携性。因为有了payload部分，所以JWT可以在自身存储一些其他业务逻辑所必要的非敏感信息。
  便于传输，jwt的构成非常简单，字节占用很小，所以它是非常便于传输的。
- 拓展性。 它不需要在服务端保存会话信息, 所以它易于应用的扩展

### 安全相关

- 不应该在jwt的payload部分存放敏感信息，因为该部分是客户端可解密的部分。
- 保护好secret私钥，该私钥非常重要。
- 尽量使用https协议