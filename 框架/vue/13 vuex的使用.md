# VueX

> 就相当于eventBus，提供了一个全局的仓库，将数据之间的传递都放到这里来处理。
>
> 所有的组件需要提交数据都提交到vuex，拿数据也通过vuex，这样就省得进行子父，父子的麻烦传值了
>
> 但是这个插件仅适用于业务逻辑复杂的功能。

1.  引包

`cnpm i vuex -D`

`<script src="./node_modules/vuex/dist/vuex.js"></script>`

2.  实例化vuex,挂载到vue实例

```js
var store = new Vuex.Store({});
//挂载之后才能够在模板中使用$store对象
var vm = new Vue({
  store,
})
```

## store实例对象的方法

1. `state` : 所有需要操作的数据都保存在这里
2. `mutations`: 改变state中数据的**唯一方法**,必须传入state数据本身，才能调用自己的数据
3. `getters`: 数据一改变就会触发它，专门用来处理数据的，不能去改动原有数据。因为数据一旦改变，就会触发该方法本身，导致死循环。

```js
var store = new Vuex.Store({
  state:{
    //所有要存放的数据
    msg:0
  },
  mutations:{
    //能够改变原数据的方法都放这里
    add(state){// 必须传入state自己
      state.msg++
    }
  },
  getter:{
    // 这里的方法，都不能够去改变原有的数据，否则死循环
    addOne : state=> var r = state.msg++,
    // 需要传数据进去的写法，固定写法
    addTwo : (state,getter) => (id) => {
      // id 就是要传入的数据
      return state.msg + id
    }
  }
})
```

## 使用

### 调用`mutations`中的方法

- 通过调用 `this.$store.commit(函数名)`   即可触发

```js
var vm = new Vue({
  store,
  methods:{
    action(){//调用一下action方法，就会触发mutations里面的函数
      this.$store.commit('add')
    }
  }
})
```

### 使用`getter`中的方法

- 直接使用 `$store.getter.方法名()` ，再通过变量接收一下返回值
- `$store.getter.方法名(参数)`

```js
created(){
  	var result = this.$store.getter.addOne()
	//传参
	var r = this.$store.getter.addTwo(5)
}

```

