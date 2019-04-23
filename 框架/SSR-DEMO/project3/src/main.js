// /* main.js */
import Vue from 'vue'
import createRouter from './route'
import createStore from './store'
import App from './App.vue'


// 导出一个工厂函数，用于创建新的vue实例
export function createApp() {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return app
}