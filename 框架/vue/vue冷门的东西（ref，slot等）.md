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

## 插槽

> 组件定义好后会被渲染加载到页面上，所以在里面写标签是会被整没的。
>
> 有些时候需要在自定义标签里面写标签咋办？
>
> 通过`slot` 

```html
		<my-div>
            <p>我有吗</p>
        </my-div>
	<script type='text/template' id='tpl'>
        <div>
            <slot></slot>
            <p>我在中间</p>
        </div>
    </script>
```

- slot放在哪，写在里面的标签就会在组件的哪边。

### 带name的插槽

- 要插入的标签通过slot属性指定插槽的位置
- slot加上一个name属性代表是谁的插槽

```html
		<my-div>
            <p>我也是插槽</p>
            <p slot='first'>我有吗</p>
        </my-div>

	 <script type='text/template' id='tpl'>
        <div>
            <slot></slot>
            <p>我在中间</p>
            <slot name='first'></slot>
        </div>
    </script>
```

