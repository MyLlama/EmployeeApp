import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/userProfile.vue')
    }
  ]
})

export default router
