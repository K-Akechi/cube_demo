import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import * as THREE from 'three'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(THREE)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
