import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
Vue.use(Vuex)

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      msg: ''
    },
    mutations: {
      setMsg(state, msg) {
        state.msg = msg
      }
    },
    actions: {
      getMsg( { commit } ) {
        return Axios.get('http://localhost:8881/api/getMsg').then( res => {
          commit('setMsg',res.data)
        } )
      }
    }
  })
  return store
}