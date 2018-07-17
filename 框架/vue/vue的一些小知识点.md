# 一些可能用到的东西

## ref和$refs

- `ref`是一个属性，可以绑定在vue实例管辖的任意标签中。
- 绑定后可以在实例中通过`this.$refs`调用,是一个对象
- 如果实在要操作dom，最好用这个方式
- 可以做任何形式的传值，但是耦合比较严重最好不要

```html
 <div id='app'>
   //绑定一个ref
        <button ref='btn' @click='getTag'>{{msg}}</button>
    </div>
    <script src='./node_modules/vue/dist/vue.js'></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                msg: '我是按钮啊'
            },
            methods: {
                getTag() {
                  //按钮点击后就能获得这个标签
                    console.log(this.$refs);
                }
            },
        })
    </script>
```

## 动态绑定组件 `:is`

> 如果要在一个区域，根据不同条件展示不同的组件。
>
> 可以通过`<component :is='变量'></component>` ，来展示。

```js
let vm = new Vue({
    el:'#app',
    data:{
        see:'index',  // 展示子组件index
    },
    components:{
     // 多个子组件
        home:{
            template:'<div>home组件</div>'
        },
        index:{
            template:'<div>index组件</div>'
        },
        zzc:{
            template:'<div>zzc组件</div>'
        }
    }
})
```

### `keep-alive`

> 主要用于保留组件状态或避免重新渲染
>
> 也就是说，会保存切换掉的组件，优化性能。
>
> `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
>
> 当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

```html
<keep-alive>
    <component :is='see'></component>
</keep-alive>
<button @click='see = "home"'>切换组件</button>

<script>
  // js
    let vm = new Vue({
        el:'#app',
        data:{
            see:'index',
        },
        components:{
            home:{
                template:'<div>home组件</div>'
            },
            index:{
                template:'<div>index组件</div>'
            },
            zzc:{
                template:'<div>zzc组件</div>'
            }
        }
    })
</script>
```

> **注意:**
>
> 只有切换单个组件才能够缓存。
>
> 所以只有在里面写`v-if`才有用，`v-for` 没有意义。

```html
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```

### `keep-alive`的`include` 和`exclude` 

> 用来有条件的缓存切换的组件
>
> 可以写用`，` 分割的字符串、正则、数组
>
> 用字符串分割的不用加`：` 

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b"></keep-alive>
<!-- 正则表达式 要用: -->
<keep-alive :include="/a|b/"></keep-alive>
<!-- 数组 要用: -->
<keep-alive :include="['a', 'b']"></keep-alive>
<!-- 常见的和路由一起用 -->
<keep-alive>
	<router-view></router-view>
</keep-alive>

```

