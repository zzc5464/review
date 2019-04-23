import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      // {path : '/', component: () => import('./page/a.vue').then(m => m.default) },
      {path : '/', component: require('./page/a.vue') },
      // {path : '/b', component:() => import('./page/b.vue').then(m => m.default)},
    ]
  })
  return router
}
