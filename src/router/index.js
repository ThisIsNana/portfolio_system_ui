import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/news/:newsId?',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: () => import('../views/AddNewsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
  ]
})

export default router
