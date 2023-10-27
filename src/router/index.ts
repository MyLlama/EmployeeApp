import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.ts'

const authStore = useAuthStore()
// const isAuthenticated = authStore.isAuthenticated

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
      component: () => import('../views/auth/TheLogin.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if
// })

export default router
