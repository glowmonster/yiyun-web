'use strict'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import user from './module/user'
Vue.use(Vuex)
const getters = {}
const store = new Vuex.Store({
  modules: {user},
  getters,
  plugins: [
    createPersistedState({
      key: 'yiyun',
      storage: window.sessionStorage
    })
  ]
})
export default store
