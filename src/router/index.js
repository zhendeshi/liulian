import Vue from 'vue'
import VueRouter from 'vue-router'

import homeUrls from './home'
import loginUrls from './login'
import find from './find'
import community from './community'
import featured from './featured'
import mine from './mine'

Vue.use(VueRouter)

const routes = [

  {path: '/', redirect: '/auth'},
  {path: '*', redirect: '/auth'},

  ...homeUrls,
  ...loginUrls,
  ...find,
  ...community,
  ...featured,
  ...mine
]

const router = new VueRouter({
  base:'/dist/',
  mode: 'history',
  routes
})

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
