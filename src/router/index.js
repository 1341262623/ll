import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import users from '@/components/users/users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: home,
      children:[{
      name: 'users',
      path: '/users',
      component: users
    
      }]
    }
    
     
  ]
})
