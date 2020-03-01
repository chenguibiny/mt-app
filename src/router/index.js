import Vue from 'vue'
import Router from 'vue-router'

import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import Index from '@/page/index.vue'
import ChangeCity from '@/page/changeCity.vue'
import GoodsList from '@/page/goodList.vue'
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'

import Ceshi from '@/ceshi/index'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/ceshi',
      name:'ceshi',
      component:Ceshi
    },
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      //重定向
      redirect:'/index',
      children:[
        {
          path:'/index',
          name:'index',
          component:Index
        },
        {
          path:'/changeCity',
          name:'changeCity',
          component:ChangeCity
        },{
          path:'/goods/:name',
          name:"goods",
          component:GoodsList
        }
      ]
    },
    {
      path:'/blank',
      name:'blankPage',
      component:blankPage,
      redirect:"/blank/login",
      children:[
        {
          path:'login',
          name:'login',
          component:Login
        },
        {
          path:'register',
          name:"register",
          component:Register
        }
      ]
    }
  ]
})
