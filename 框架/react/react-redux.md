# react-redux

## 概念

它是为了在 react 中更好的使用 redux 而再次封装的一个库。

将组件分成了两大类：

1. ui 组件，只负责展示，不管逻辑。
2. 容器组件负责 store的数据和操作

简而言之,ui 组件只拿 prop 的值，没有内部的 state。

容器组件是 react-redux 自动生成。

通过 react-redux的 `connect` 方法把容器组件和 ui 组件连在一起

连起来之后，要写容器的 state 映射到 ui 组件 prop 的方法

数据和方法分开，一个取值一个操作数据，所以是两个函数 `mapStateToProps` `mapDispatchToProps`

编写 `Reducer` ,通过`createStore`生成`store`

因为要让所有组件都能拿到`state`,要用一个组件`Provider`将我们的应用包起来 

## 使用

- 简单的增加例子

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// 1. 写一个 ui 组件
class Counter extends Component {// 这是 ui 组件，里面没有自己的 state  

  render() {
    // 所有的数据和操作都由 props 来定
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
// PropTypes 是检测变量类型的库,与主流程无关
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// 2. 写数据和操作的映射函数
function mapStateToProps(state) { // 将外层 state 的值 映射到ui组件的 props
  return {
    value: state.count // prop.value = state.count
  }
}
function mapDispatchToProps(dispatch) {
  return {// prop.onIncreaseClick 会触发 dispatch
    onIncreaseClick: () => dispatch(increaseAction) // {type: 'increase'}
  }
}

// 3. 连起来
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// 4. 写对应操作的函数处理
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) { 
    case 'increase': // 判断 action 的 type
      return { count: count + 1 }
    default:
      return state
  }
}

// Store 5. 生成 store
const store = createStore(counter)





// 6 用Provider把我们的应用包起来，并把 store 传进去
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

```

