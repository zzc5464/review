import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import store from './store';
export function createApp() {
  const router = createRouter()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app', true)
  return {app, router, store}
}
