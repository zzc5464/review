# vue基础语法

## 模板语法

1. 绑定信息
   - Mustache(双大括号包裹)
   - v-html
   - v-text
2. 绑定属性
   - v-bind:id
3. 表达式

{{id==1?"ok":"else"}}

4. 指令
   - v-if

## 绑定类名

1. v-bind:class

```shell
//html
<div id="demo1" v-bind:class="{now:color}">我会变红</div>
//css
.now {
     background-color: red;
}
//js
var demo1 = new Vue({
    el:"#demo1",
    data:{
        color:true
    }
})
```

2. 数组语法

```powershell
# html
<div id="demo2" v-bind:class="[one,two]">我会变红又变高</div>
#css
.now {
    background-color: red;
}
.height {
    height: 200px;
}
# js
var demo2 = new Vue({
    el:"#demo2",
    data:{
        one:'now',
        two:'height'
    }
})
```

## 绑定内联style

```powershell
# html
<div id="demo3" v-bind:style="obj">我的22px的字是蓝色</div>
# js
var demo3 = new Vue({
    el:"#demo3",
    data:{
        obj:{
            color:"blue",
            fontSize:"22px"
        }
    }
})
```

## 条件渲染

```powershell
# html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
# js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

## 事件绑定

- 用v-on:事件声明，里面的值就是事件触发会调用的函数
- 函数要在methods中定义

```powershell
# html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">变成数组</button>
</div>
#js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello 我的哥'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('');
    }
  }
})
```

### 事件绑定的修饰符

- 就是在事件绑定后面再.xxx会有添加一些效果（取消冒泡等）

```html
<button v-on:click.stop.prevent="reverseMessage">逆转消息</button>
<!-- stop是取消冒泡  prevent取消默认事件 -->
<button v-on:click.once="reverseMessage">逆转消息</button>
<!-- once代表这个按钮只能点击一次 -->

```



