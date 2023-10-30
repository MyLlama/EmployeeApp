import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/TheLogin.vue')
    }
  ]
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()
  console.log(authStore.isAuthenticated())
  if (!authStore.isAuthenticated() && to.name !== 'login') {
    next('/login')
  } else if (to.fullPath === '/login' && authStore.isAuthenticated()) {
    next('/home')
  } else {
    next()
  }
})

export default router
