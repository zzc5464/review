/* entry-client.js */
import { createApp } from '../src/main'


const app = createApp()

if(window.__INITIAL_STATE__) {
  app.$store.replaceState(window.__INITIAL_STATE__)
}

// 绑定app根元素
window.onload = function() {
  app.$mount('#app')
}