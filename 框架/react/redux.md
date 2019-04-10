# Redux

## 核心函数

```javascript
import { createState,combineReducers } from 'redux'
const state = createState(reducer)
state.dispatch(action)
state.getState()
state.subscribe(fn)
```

> 简述一下这几个核心函数
>
> `createState` 用来创建`state`状态(数据)树。
>
> 此状态树是不可以直接取修改值得，必须通过一个`action` 触发去改变值。
>
> 所以要传入一个处理函数`reducer`，此函数是自己来实现的,要求必须是一个纯函数。
>
> `action` 是一个对象，必须带有`{type:'TypeName'}`。`reducer`函数就通过`action.type`判断进行操作。
>
> 将`action` 传入`dispatch(action)` ,会自动调用`reducer` 把`state`里的值改变

`reducer`大致相当于下面这样的函数

```js
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};
```

## subscribe

`subscribe` 用来监听state是否更新，一般会用来进行dom节点的更新。

```js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe(); // 调用返回的函数会停止监听
```



## combineReducers

`combineReducers` 相当于合并模块的功能，因为一个项目的数据会非常多。不进行模块拆分会导致一个文件特别的大。

可以根据操作的不同状态来划分模块

```js
import { combineReducers } from 'redux';
// a,b,c相当于模块名
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})

// 等同于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

## 例子

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux';
import App from './modules/App'

// 1. 创建一个处理函数reducer，根据不同的type来处理不同的事件。
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};
// 2. 生成store
const store = createStore(reducer);
const render = () => {
  ReactDOM.render(
    <App
      value={store.getState()}
        // 3. 绑定改变state的dispatch，并传入action
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('app')
  );
};
// 4. 初始化
render();
 // 5. 监听state，一旦改变，重新渲染dom树
store.subscribe(render);

```

## 异步(middleware)

> 异步的数据更新需要用到`middleware` 中间件
>
> `middleware` 只是可以做中间件，但不仅仅只能做中间件
>
> 网上有非常多的中间件可以用，所以只要了解怎么安装中间件就可以了

```js
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

`logger` 是一个打印日志的中间件，`applyMiddleware` 的作用是将传入的所有中间件按照顺序执行。

注意点： 

1. `createStore`方法可以接受整个应用的初始状态作为参数，那样的话，`applyMiddleware`就是第三个参数了。
2. 中间件的使用有顺序之分,使用前要看中间件的文档。

```js
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```



```js
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
```

