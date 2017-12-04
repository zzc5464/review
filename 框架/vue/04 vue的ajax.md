# vue-resource && axios

> vue 是渐进式的框架，就像zepto。本身只是提供了基础的api，请求的功能需要调用插件或者借助第三方的包才能使用。

## vue-resource

> vue 官方提供的ajax插件，但是已经停止维护了。
>
> 不过功能什么的都很全的，可以用用。

- 安装

`npm i vue-resource -S`

[官网地址](https://www.npmjs.com/package/vue-resource)

- 使用

> 引包
>
> `<script src="../node_modules/vue/dist/vue.js"></script>`
>
> `<script src="../node_modules/vue-resource/dist/vue-resource.js"></script>`
>
> 基于vue的插件，所以要在vue包后面引入

1. 通过`this.$http()`使用

- this.$http.请求方式(地址).then(回调)

```js
//直接通过this.$http开启ajax服务
//这个this就是vm实例
//this.$http.get(url).then(res => {})
this.$http
.get("http://vue.studyit.io/api/delproduct/" + id)
.then(function(res){
	if(res.body.status == 0){
	this.getData();
	}
})
```

2. 通过`Vue.http.get().then(res=>{})`

> 用法和上面一样

### post请求

```js
			if(this.brandName.trim()){
                        this.$http
                            .post("http://vue.studyit.io/api/addproduct", {
                                //使用vue-resource发送post请求的时候
                                //参数需要是一个对象，对象中的属性名就是参数名
                                //属性值就是参数值
                                name: this.brandName
                            }, {
                                //如果发送的数据格式是个对象
                                //那么需要在设置对象中加上如下的属性
                                //将参数的对象以application/x-www-form-urlencoded （表单数据的格式）发送给后台
                                emulateJSON: true
                            })
                            .then(function(res){
                                if(res.body.status == 0){
                                    //如果后台返回添加成功
                                    //那么我们就重新从数据库中获取所有的列表数据进行展示
                                    this.getData();
                                    this.brandName = "";
                                }
                            })
                    }
```



## axios

> 第三方的插件包
>
> 不用在vue包之后引入，甚至可以在普通项目中使用

- 安装

`npm i axios -S`

- 官网

[axios](https://www.npmjs.com/package/axios)

### 使用

```js
axios({
  url:地址,
  method:'请求方式',
  data:{数据}
}).then(回调)
```

- 使用get请求直接在url地址后面通过?传参
- 但使用post请求要在data中传入参数
- 因为data中的参数是对象类型的，所以需要搞个中间件

### 中间件

- 传输给服务器的参数只能是字符串，axios的data传的是对象
- 所以就弄了个中间件处理每次提交的data
- 下面的代码是处理对象类型的data变成字符串data

```js
axios.interceptors.request.use(function(config) {
            // Do something before request is sent
            // console.log("拦截器方法被调用了")
            // console.log(config);
    if (typeof config.data == "object") {
      var str = "";
      for (var k in config.data) {
        str += k + "=" + config.data[k] + "&"
      }
      config.data = str;
	}
	return config;
});
```

