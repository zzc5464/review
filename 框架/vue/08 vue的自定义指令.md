# 自定义指令

> vue的指令是什么？
>
> 带有特定功能的html标签属性，vue内部提供了一些指令，比如：`v-html，v-text，t-bind`
>
> 但是对于我们开发来说也是不够滴，所以就有自定义指令的需求。
>
> 自定义组件一般是需要操作dom的时候用到的。

完整指令的写法：

`v-bind:click.stop=''`

**v-指令名称:参数.修饰符=表达式**

## 定义全局指令

> 通过 `Vue.directive('指令名',{})` 定义一个全局组件
>
> 参数1： 不带v-的指令名称
>
> 参数2： 指令绑定后的事件，一共五个钩子函数

```js
//定义一个v-mytext指令
Vue.directive('mytext', {})
```

### 自定义组件的钩子函数

> 分别是：
>
> 1. 指令第一次绑定绑定到元素
> 2. 被绑定的元素插入父节点，只是插入，不一定显示在页面上。
> 3. 绑定的数据发生变化的时候，dom更新之前触发
> 4. 绑定的数据发生变化的时候，dom更新之后触发
> 5. 解绑的时候触发

```js
            Vue.directive("focus", {
                bind(el){
                    //每个钩子函数都可以接收到el参数，这个参数就是指令所在的元素的DOM对象
                    //我们可以在钩子函数中通过el对元素进行任何想要的操作！！

                    el.value = "我在指令钩子函数中改了文本框的内容"
                    // console.log(el);
                    //只调用一次，指令第一次绑定到元素时调用
                },
                inserted(el){
                    //被绑定元素插入父节点时调用
                    el.focus();
                },
                update(el){
                    //当指令绑定的数据发生变化的时候，DOM更新之前调用
                },
                componentUpdated(el){
                    //当指令绑定的数据发生变化的时候，DOM更新之后调用                    
                },
                unbind(el){
                    //当指令从元素上解绑的时候调用
                }   
            })
```

- 钩子函数通过`el` 参数获取到绑定了的元素
- 最常用的是 `bind`  、 `update` ，`inserted` 偶尔会用到
### 获取绑定元素的其他值 

> 钩子函数可以传两个参数
>
> 1. 就是上面说的el，绑定的是元素
> 2. `binding` ，是一个对象，显示了绑定元素的各种信息

```js
Vue.directive("mytext", {
    bind(el, binding){
        //binding， 和当前指令相关的所有的信息，都在这个binding对象里面
        //binding.name 不带v-的指令名
        //binding.rawName 完整的指令名称
        //binding.arg 指的就是指令的参数部分 :后面的内容
        //binding.modifiers 指的就是指令修饰符部分，只要修饰符中有，那么这个对象中就会有这个修饰符为名称属性，值为true
        //binding.expression 指的就是=右边的部分
        //binding.value 指的就是expression中的内容所代表值！！
        el.innerText = binding.value;
    },
    update(el, binding){
        el.innerText = binding.value;                
    }
})
```

### 钩子函数的简写形式

> 因为写指令的时候不一定是所有钩子函数都要用到
>
> vue提供了简写形式，将`bind`和`update`这俩钩子写在一起

```js
Vue.directive('指令名称',function(el,binding){
  //这个函数在bind和update钩子函数触发时，都会调用
})
```

### 使用自定义指令写一个事件绑定

- `v-bind:click.stop=''` 可以用到完整的自定义指令写法

```js
//比如写一个v-myclick:click.stop='add'
Vue.directive('myclick',(el,binding)=>{
  el.addEventListener(binding.arg,e => {
    if(binding.modifiers.stop) {
      e.stopPropagation()
    }
    //让绑定的函数名执行
    binding.value()//add
  })
})
//实例化了vm
var vm = new Vue({
  el:'app',
  data:{
   msg:'点击了' 
  },
  methods:{
    add(){
      console.log('我被点击了')
    }
  }
})
```

- 调用

```html
<button v-myclick:click.stop='add'>点击</button>
```

#### tips

- 绑定的事件最好还是分开写，因为在bing和update都绑定了事件的话，数据一旦更新会触发两次

## 定义私有的指令

> 给vue实例添加`directives`参数定义私有指令

```js
		var vm = new Vue({
            el: '#app',
            data: {
                msg: '阿西坝'
            },
            methods: {
                say() {
                    console.log('点到我了');
                }
            },
            directives: {//这里定义私有指令
              //其他写法都一样
                'mytext': {
                    bind(el, binding) {
                        console.log(binding);
                        el.innerText = binding.value;
                    },
                    update(el, binding) {
                        el.innerText = binding.value;
                    }
                }
            }
        })
```

