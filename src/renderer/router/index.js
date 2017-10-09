import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user-profile',
      component: require('@/components/userProfile').default
    },
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/login').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home').default
    },
    {
      path: '/playing',
      name: 'playing',
      component: require('@/components/playing').default
    },
  ]
})
