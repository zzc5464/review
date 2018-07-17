# vuex

> vuex是vue专用的数据操作工具。
>
> 常用于组件通信，提供了一系列api用于操作数据。
>
> 里面存储的数据都是响应式的，不可以直接操作里面存储的数据。
>
> 制作中大型的应用比较适合用它。
>
> [文档](https://vuex.vuejs.org/zh/)

## 安装

### 普通项目安装

- [cdn](https://unpkg.com/vuex@3.0.1/dist/vuex.js)

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

> 此方式会自动安装

### 模块化安装

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 必须使用Vue.use安装Vuex
```

## 初体验

```js
    const store = new Vuex.Store({
      state:{
        number:0,
      },
    });
    console.log(store.state); // 会得到一个储存了双向绑定数据的对象
```

![](./md-img/01.png)

> 但是呢，这里的数据只能看不能动。
>
> 必须使用`mutations` 来提交改变数据。
>
> 要让number增加要这样写

```js
    const store = new Vuex.Store({
      state:{
        number:0,
      },
      mutations:{
        add(state) {
          state.number++;
        },
        // 方法2
        // add(){
        //  this.state.number++;
        // }
      }
    });
    store.commit('add');
    console.log(store.state.number); // 1
```

> Tips : 
>
> 1. 必须声明一个方法，把store对象中的state当作参数传进去。
> 2. 在这个方法中操作数据。
> 3. 使用store对象的`commit` 方法将函数名传入执行。

### 将store挂载到vue实例

```html
  <div id="app">
    <button @click='add'>+</button>
    <span>{{$store.state.number}}</span>
    <button @click='des'>-</button>
  </div>
```

```js
    const store = new Vuex.Store({
      state: {
        number: 0,
      },
      mutations: {
        plus(state) {
          state.number++;
        },
        des(state) {
          state.number--;
        },
      }
    });
    const vm = new Vue({
      el: '#app',
      store, // 挂载到vue实例后，可通过this.$store访问vuex对象
      methods: {
        add() {
          this.$store.commit('plus')
        },
        des() {
          this.$store.commit('des')
        },
      },
    });
```

### 在组件中使用

- 挂载到vue实例的store，可以让所有它的子组件通过`this.$store`来调用数据

```html
  <div id="app">
     <father></father>
     <son></son>
     <button @click='add'>reserve</button>
  </div>
```

```js
    Vue.component('father',{
      template:`<div>{{$store.state.number}}</div>`
    });
    Vue.component('son',{
      template:`<div>{{$store.state.number}}</div>`
    });
    const store = new Vuex.Store({
      state:{
        number:0,
      },
      mutations:{
        add(state){
          state.number ++;
        }
      }
    });
    const vm = new Vue({
      el:'#app',
      store,
      data:{},
      methods:{
        add(){
          return this.$store.commit('add')
        }
      }
    })
```



## State

> 概念：单一状态树。就是说，所有的数据储存源头都是它。
>
> 单一状态和模块化并不冲突。
>
> 使用 Vuex 并不意味着你需要将**所有的**数据放入 Vuex。

### mapState

> 为了解决单个组件用多个数据时的冗余操作，它可以帮忙生成计算属性。

- 写法

```js
    const mapState = Vuex.mapState; // 不用new
    const store = new Vuex.Store({
      state: {
        num: 1,
      }
    });
    const vm = new Vue({
      el: '#app',
      store,
      // 写法1
      computed: mapState([
        'num'  // 计算函数名和state中的名字相同可以写成数组
      ]),
      // 写法2
      computed:mapState({
        number : state => state.num,
        count : 'count',
        locationCount(state){ // 要与vue实例的数据进行计算的时候写法，不可以写箭头函数
          return state.count + this.locationData;
        },
      }),
      // 写法3 混入 
      computed:{
        getNum(){
          return this.locationData
        },
        ...mapState([
          'num'
        ])
      },
    });
```

> 这个辅助函数就相当于将`store.state`中的数据和`computed`中的计算属性做一个绑定
>
> 常用的写法有三种:
>
> 1. vue实例映射的store数据名称一致，使用数组写变量名的字符串`['num','xx']`
> 2. 如果是要跟vue实例中的data进行计算的，不可以写箭头函数
> 3. 混入，就是说本来在vue实例就有一些计算属性，现在要将mapState混进去。直接用es6的`...` 语法即可

## Getter

> 相当于state的计算属性。要重复使用一些条件去过滤数据，应用在不同组件中时常用。

```html
  <div id="app">
    <son1></son1>
    <son2></son2>
  </div>
```

```js
    // 通过 $store.getters.方法名调用
    Vue.component('son1', {
      template: `<div>{{$store.getters.getLen}}</div>`,
    });
    Vue.component('son2', {
      template: `<div>{{$store.getters.getLen}}</div>`,
    });
    const store = new Vuex.Store({
      state: {
        arr: [1, 2, 3],
      },
      getters: {
        getLen: state => { // 申明计算属性，将state传进去
          return state.arr.length;
        }
      }
    });
    const vm = new Vue({
      el: '#app',
      store,
    });
```

### 第二个参数

> 参数1：state对象 参数2 ： getters对象

```js
    const store = new Vuex.Store({
      state:{
        arr : [0,1,2,3],
      },
      getters : {
        one : state=> {
          return state.arr[1];
        },
        /*
          第二个参数，就是将getter对象传进来。
          通过一个计算属性调用另一个计算属性。
        */
        getIndex : (state,getters) =>{
          return state.arr[getters.one];
        }
      }
    });
    const vm = new Vue({
      el:'#app',
      store,
      created() {
        console.log(this.$store.getters.getIndex); // 1
      },
    });
```

### 返回一个函数来使用

> 通常我们希望能够对计算属性进行传参，灵活的获取想要的值。

```js
    const store = new Vuex.Store({
      state : {
        arr : [1,2,3,4,5],
      },
      getters:{
        getIndex : state => id =>{
          return state.arr[id];
        },
      }
    });
    console.log(store.getters.getIndex(1)); // 2
```

```js
// 这是一段es6代码的简写
        getIndex : state => id =>{
          return state.arr[id];
        },
// 写成es5的代码如下
         getIndex : function(state) {
          return function(id) {
            return state.arr[id];
          }
        },
```

### mapGetters

> 跟`mapState`一样的东西，就是将getters映射到vue实例中的计算属性

```js
    const mapGetters = Vuex.mapGetters;
    const store = new Vuex.Store({
      state:{
        arr : [1,2,3,4],
      },
      getters:{
        arrStr : state=>{
          return state.arr.join('变');
        }
      }
    });
    const vm = new Vue({
      store, // 数组写法一定要挂载
      computed:{
        ...mapGetters([
          /*
          相当于写了arrStr = this.$store.getters.arrStr
          */ 
          'arrStr', 
        ])
      },
      created() {
        console.log(this.arrStr);
      },
    });
```

## Mutation

> 更改state中数据的唯一方法。
>
> 更改后的数据也是响应式的。
>
> 必须是同步函数。
>
> 就像vue中的methods，但不能直接调用它，而是要通过`commit` 的方式来提交
>
> 每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**

```js
    const store = new Vuex.Store({
      state:{
        num : 0,
      },
      mutations : {
        add : state=>{
          state.num ++;
        }
      },
    });
    store.commit('add'); // 只能通过commit触发mutations中定义的方法。
    console.log(store.state.num); // 1
```

### 荷载

> 除了state，还可以传入一个额外的参数进去。
>
> 大多数时候都是传一个对象。

```js
    const store = new Vuex.Store({
      state:{
        num : 0,
      },
      mutations : {
        // 荷载
        addthree : (state,options) => {
          return state.num += options.num
        }
      }
    });
    // 调用
    store.commit('addthree',{
      num : 3,
    });
    console.log(store.state.num); // 3
```

> 对象的提交方式
>
> 将mutations的函数名写在提交对象的type中
>
> 效果和上面一样

```js
    store.commit({
      type : 'addthree', // 这里写函数名
      num : 3,
    });
```

### 在组件中使用

> 将store挂载到vue实例，实例下的所有组件都可以通过`this.$store.commit('xxx')`进行调用

```js
    Vue.component('son1', {
      template : `<button @click='addNum'>{{$store.state.num}}</div>`,
      methods : {
        addNum(){
          this.$store.commit('add'); // 调用
        }
      }
    })
    const store = new Vuex.Store({
      state:{
        num : 1,
      },
      mutations : {
        add : state =>{
          state.num ++;
        }
      }
    });
    const vm = new Vue({
      el : '#app',
      store, // 必须挂载
    })
```

### mapMutations

> 前面的两个`map`都是映射到计算属性，这个map是映射到`methods`中
>
> 使用`mapMutations` 添加映射到vue实例的`methods`中

```html
  <div id="app">
    <span>{{$store.state.number}}</span>
    <button @click='add'>映射添加</button>
    <span>{{outerNum}}</span>
    <button @click='plus'>本身添加</button>
  </div>
```

```js
    const mapMutations = Vuex.mapMutations;
    const store = new Vuex.Store({
      state :{
        number : 1,
      },
      mutations : {
        add : state =>{
          state.number ++;
        }
      }
    });
    const vm = new Vue({
      el : '#app',
      store,
      data : {
        outerNum : 1,
      },
      methods : {
        plus(){
          this.outerNum ++;
        },
        ...mapMutations(['add']),
      }
    });
```

## Action

> mutation必须是同步操作，action是为了解决异步的问题。
>
> action中定义的函数接收一个参数，它跟`store`对象具有同样的属性和方法，也可以调用`store.state` 、`store.getters` 但是它不是store对象本身。
>
> 通过`actions`定义，`dispatch`调用

```js
    const store = new Vuex.Store({
      state: {
        num: 1,
      },
      mutations: {
        add(state) {
          state.num++;
        },
        asyncAdd(state) {
          state.num++;
          console.log(state.num); // 异步执行 值为2
          
        },
      },
      actions: {
        add(context) {
          context.commit('add');
        },
        asyncAdd({ commit }) {
          setTimeout(_ => {
            commit('asyncAdd');
          },1000);
        },
      }
    });
    // 调用
    store.dispatch('add'); // 立即执行 值为1
    console.log(store.state.num);
    store.dispatch('asyncAdd');// 异步执行 值为2

```

### 荷载

> 与`mutations`一样，`actions`也可以荷载

```js
    const store = new Vuex.Store({
      state : {
        num : 0,
      },
      mutations : {
        add : state=>{
          state.num ++;
        },
      },
      actions : {
        add : (context,options) =>{
          setTimeout(() => {
            context.commit('add');
            context.state.num += options.num;
            console.log(context.state.num ); // 1s 后值为11
          }, 1000);
        }
      }
    });
    // 写法1
    // store.dispatch('add',{num : 10});
    // 写法2
    store.dispatch({
      type : 'add', // 这里写actions中的方法名
      num : 10,
    });
```

### 在组件中使用

> 与mutations一样的操作
>
> 给vue实例挂载store，使用`this.$store.dispatch('xxx')`调用
>
> 同样具有`mapActions` 映射到vue实例的`methods` 

```html
  <div id="app">
     <brother></brother>
    <button @click='add'>添加</button>
  </div>
```

```js
    const mapActions = Vuex.mapActions;
    Vue.component('brother', {
      template : `<div>{{$store.state.num}}</div>`,
    });
    const store = new Vuex.Store({
      state : {
        num : 1,
      },
      mutations : {
        add :state=> {
          state.num ++ ;
        }
      },
      actions : {
        add : ({commit}) =>{
          setTimeout(_=>{
            commit('add');
          },1000)
        }
      }
    });
    const vm = new Vue({
      el : '#app',
      store,
      methods : {
        ...mapActions(['add']),
      }
    });
```

### 组合使用actions

> `actions`异步操作数据，可以搭配`promise`。
>
> 可以在`actions`中调用另一个`actions`

```js
    const store = new Vuex.Store({
      state: {
        num: 1,
      },
      mutations: {
        add: state => {
          state.num++;
        }
      },
      actions: {
        // 使用promise得到异步调用的结果
        add: ({ commit, state }) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              commit('add');
              resolve(state.num);
            }, 1000);
          })
        },
        // 在一个actions中调用另一个actions
        addB: ({ dispatch, commit }) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch('add').then(num => {
                commit('add');
                resolve();
              });
            }, 1000);
          })
        }
      }
    });
    // 使用promise得到异步调用的结果
    store.dispatch('add').then(num => {
      console.log('执行完成num = ' + num);
    });
    // 在一个actions中调用另一个actions
    store.dispatch('addB').then(_=>{
      console.log('执行完毕B'); // 此结果会比前一个log慢一秒
    });
```

## Module

> 做大型的项目使用vuex肯定会有模块拆分的需求
>
> module就是用来拆分代码的

```js
    const mA = {
      state : {
        a : 1,
        b : 1,
      }
    }
    const mB = {
      state : {
        a : 2,
        b : 2,
      }
    }
    const store = new Vuex.Store({
      modules : {
        a : mA,
        b : mB,
      }
    });
    console.log(store.state.a);
    // {
    //   a : 1,
    //   b : 1,
    // }
    console.log(store.state.b);
    // {
    //   a : 2,
    //   b : 2,
    // }
```

## vuex项目规则

> 1. 应用层级的状态应该集中到单个 store 对象中。
> 2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
> 3. 异步逻辑都应该封装到 **action** 里面。





