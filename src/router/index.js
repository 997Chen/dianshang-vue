import Vue from 'vue'
import Router from 'vue-router'
/*import Header from '@/components/common/Header'
import Left from '@/components/common/Sidebar'
import Tag from '@/components/common/Tags'
import Home from '@/components/common/Home'
import zhuye from '@/components/zhuye'*/
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/zhuye'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/zhuye',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/zhuye.vue'),
          meta: { title: '系统首页' }
        },{
          path: '/Type',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/shop/Type.vue'),
          meta: { title: '分类管理' }
        }
        ,{
          path: '/Pinpai',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/shop/Pinpai.vue'),
          meta: { title: '品牌管理' }
        },
        {
          path: '/Shuxing',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/shop/Shuxing.vue'),
          meta: { title: '属性管理' }
        },

        ]}
  ]
})
