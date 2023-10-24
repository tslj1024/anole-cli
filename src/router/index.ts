import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// TODO 动态路由
const routes: Array<RouteRecordRaw> = [
  // eg:
  // {
  //     path: '/login',
  //     name: 'Login',
  //     meta: {
  //         title: '登录',
  //         keepAlive: true,
  //         requireAuth: false
  //     },
  //     component: () => import('@/pages/login.vue')
  // },
  // {
  //     path: '/',
  //     name: 'Index',
  //     meta: {
  //         title: '首页',
  //         keepAlive: true,
  //         requireAuth: true
  //     },
  //     component: () => import('@/pages/index.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
