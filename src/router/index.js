import Vue from 'vue'
import VueRouter from 'vue-router'
import Assets from '../views/Assets.vue'
import Kykt from '../views/kykt.vue'
import Zhanshi from '../views/Zhanshi.vue'
import Tijiao from '../views/Tijiao.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Assets',
    component: Assets
  },
  {
    path: '/kykt/:dbname',
    name: 'Kykt',
    component: Kykt
  },
  {
    path: '/zhanshi',
    name: 'Zhanshi',
    component: Zhanshi
  },
  {
    path: '/tijiao',
    name: 'Tijiao',
    component: Tijiao
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
