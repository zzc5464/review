# 组件之间的传值

## 概念

> 1. 父与子组件的定义，不是说组件在某个大组件中注册就叫它的子组件
> 2. 表示为某个组件的子组件只看**标签** ，有在某个组件下使用标签，才代表他们有父子组件的关系
> 3. 不管是全局还是局部注册的组件，都只是在规定组件的**作用范围**而已

## 父向子传值

> 给父定义一个数据，通过`:属性` 的形式将数据绑定到子组件上。
>
> 子组件中使用props获取这个值，props是一个数组
>
> 可以直接通过`this.数组中的值` 来调用

```html
	<div id='app'>
      <!--2. 在子组件中通过属性绑定-->
        <login :msg='fmsg'></login>
    </div>
    <script src='./node_modules/vue/dist/vue.js'></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
              //1. 父定义一个数据
                fmsg: '这是父亲对你说的话'
            },
            methods: {},
            components: {
                'login': {
                    template: '<h1>login组件--->{{msg}}</h1>',
                  //3. 子组件通过props获取
                    props: ['msg']
                  // 在子组件中，直接通过this.msg 调用
                }
            }
        })
    </script>
```

- 在子组件中直接调用`{{msg}}`

## 子向父传值

```html

    <div id='app'>
      <!--5. 父组件通过自身data中与getsonMsg绑定的值来获取数据-->
      <div>{{sonMsg}}</div>
        <!-- 3. func触发后调用了getSonData这个方法 
			记住，仍旧是给子组件上加事件
		-->
        <son @func='getSonData'></son>
    </div>
    <script src='./node_modules/vue/dist/vue.js'></script>
    <script type='text/template' id='sonCom'>
        <div>
            <!--1. 给子组件的某个元素定义一个事件，绑定函数名 -->
            <input type="button" value='send' @click='sendMsg'>
        </div>
    </script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                sonMsg: null
            },
            methods: {
                getSonData(info) {
                    // 5. 调用之后便拿到了这个数据
                    this.sonMsg = info;
                }
            },
            components: {
                'son': {
                    template: '#sonCom',
                    methods: {
                        sendMsg() {
                            //2. this.$emit可以触发绑定在子组件身上的某个事件
                            //4. 上面定义了func  触发了还把info参数传了过去
                            this.$emit('func', {
                                info: '子组件的数据'
                            })
                        }
                    }
                }
            }
        })
    </script>

```

> 传递值的主动权在子组件手中，子组件必须通过某个事件的触发，才能将自己的值传递出去
>
> 1. 给子组件定义一个事件触发，这里定义的是`sendMsg`的点击事件
> 2. 给父组件也定义了一个事件`func` ,他可以触发`getSonData`
> 3. 在子组件`son` 标签中使用`this.$emit` 绑定事件`func` ,它会触发绑定的`getSonData` 
> 4. `getSonData` 在父组件的methods中定义，接收传递过来的值，让自身的数据绑定传过来的值。
> 5. 如此子就将数据传递到父的组件了。

## 兄弟组件的传值

> 核心事件是 `实例.$on()` 、`实例.$emit()` 。
>
>  - `$on` 表示注册一个事件（注册的方法名,函数）
>  - `$emit` 和子传父中一样用
>
> 谁传数据谁就要绑定触发事件
>
> 使用一个空的vue实例传递数据

```html

    <div id='app'>
      <!--1.1 引入两个组件-->
        <bborther></bborther>
        <sborther></sborther>
    </div>
    <script src='./node_modules/vue/dist/vue.js'></script>
    <script type='text/html' id='bb'>
        <div>
        //2. 给需要传送数据的组件绑定点击事件
            <button @click='sendInfo'>发送</button>
        </div>
    </script>
    <script type='text/html' id='sb'>
        <div>
            <p>{{msg}}</p>
        </div>
    </script>
    <script>
      // new一个实例出来，当作数据的仓库
        var infoHub = new Vue();
      //1. 注册两个组件
        Vue.component('bborther', {
            template: '#bb',
            data() {
                return {
                    msg: '老哥的爱'
                }
            },
            methods: {
              //4. 在发送数据的函数中使用$emit触发函数并传递自己的数据
                sendInfo() {
                    infoHub.$emit('getBInfo', this.msg)
                }
            }
        });
        Vue.component('sborther', {
            template: '#sb',
          //3. 在接收数据的组件中用created钩子，注册事件，并且绑定自身的getMsg函数
            created() {
                infoHub.$on('getBInfo', this.getMsg)
            },
            methods: {
              //3.1 getMsg函数会绑定传来的数据
                getMsg(v) {
                    this.msg = v;
                }
            },
            data() {
                return {
                    msg: ''
                }
            }
        })
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {}
        })
    </script>

```

- 首先实例化一个空的vue对象
1. 注册两个组件`a,b`
2. 给需要发送数据的组件`a` 绑定触发事件，这里是`click`
3. 在接收数据的组件`b` 中用`created`钩子，`$on`注册事件，并且绑定自身的getMsg函数
4. 在`a`函数中`$emit ` 触发`b`中注册的事件，并将数据传如


#### 总结

- 兄弟传值的方法，在任何传值形式下都可以使用。因为通过一个空的vue实例操作，传送和获取都经过它。那么在父-》子，子-》父中也可以这么使用
- 根本思想：谁要发数据，谁就绑事件。


#### vuex

其实这就是vuex的思想，数据都放在同一个地方管理。

不管是获取还是传入都在一个统一的容器里面。











