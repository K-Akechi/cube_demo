import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
// import Index from
import overall from "../views/overall"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/overall',
      name: 'overall',
      component: overall
    }
  ]
})
