// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'
import store from './store/store'

Vue.use(animate)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.filter('dateFormat', function (value) {
  if (!value) {
    return ''
  } else {
    var date = new Date(value)
    var dateString =
    (date.getFullYear()) + '-' +
    (date.getMonth() + 1) + '-' +
    (date.getDate()) + ' ' +
    (date.getHours()) + ':' +
    (date.getMinutes()) + ':' +
    (date.getSeconds())
    return dateString
  }
})
Vue.filter('loginLogState', function (value) {
  if (value === 0 || value === '0') {
    return '登陆成功'
  } else {
    return '登陆失败'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
