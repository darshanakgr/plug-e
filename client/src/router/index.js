import Vue from 'vue'
import Router from 'vue-router'
import DeviceDetail from '@/components/DeviceDetail'
import DeviceSubscription from '@/components/DeviceSubscription'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/device',
      name: 'DeviceDetail',
      component: DeviceDetail
    },
    {
      path: '/subscribe',
      name: 'DeviceSubscription',
      component: DeviceSubscription
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ],
  mode: "history"
})
