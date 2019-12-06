import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
// import Index from
import Solve from "../views/Solve"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/solve',
      name: 'solve',
      component: Solve
    }
  ]
})
