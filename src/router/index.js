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
      path: '/addNews/:newsId?',
      name: 'addNews',
      component: () => import('../views/AddNewsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/preview/:newsId?',
      name: 'preview',
      component: () => import('../views/PreviewView.vue')
    },
  ]
})

export default router
