import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/home',
    component: Layout,
    redirect: '/index',
    name: 'index',
    // hidden: true,
    // meta: { title: '首页', icon: 'index' },
    children: [{
      path: 'index',
      name: 'homeindex',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'index' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/usermanage',
    name: 'user',
    meta: { title: '用户管理', icon: 'users' },
    children: [
      {
        path: 'usermanage',
        name: 'users',
        component: () => import('@/views/table/Table'),
        meta: { title: '用户管理', icon: 'users' }
      }
    ]
  },
  {
    path: '/classify',
    component: Layout,
    redirect: '/classifymanage',
    name: 'classify',
    meta: { title: '分类管理', icon: 'type' },
    children: [
      {
        path: 'classifymanage',
        name: 'classifys',
        component: () => import('@/views/classify/index'),
        meta: { title: '分类管理', icon: 'type' }
      }
    ]
  },
  {
    path: '/suggest',
    component: Layout,
    redirect: '/back',
    name: 'suggest',
    meta: { title: '反馈与建议', icon: 'back' },
    children: [
      {
        path: 'back',
        name: 'back',
        component: () => import('@/views/suggest/index'),
        meta: { title: '反馈与建议', icon: 'back' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/logmanage',
    name: 'logs',
    children: [
      {
        path: 'log',
        name: 'logmanage',
        component: () => import('@/views/log/log'),
        meta: { title: '日志', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/home/index', hidden: true }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
