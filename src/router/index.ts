import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/interface',
      name: 'interface',
      component: () => import('@/views/InterfaceView.vue')
    },
    {
      path: '/404',
      name: 'err',
      component: () => import('@/views/ErrorView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
});

export default router;
