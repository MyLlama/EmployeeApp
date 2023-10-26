import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/users/TheLogin.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: null
    }
   
  ]
})

export default router
