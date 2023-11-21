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
      path: '/profile',
      name: 'profile',
      component: () => import('../views/EmployeeProfile.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/TheLogin.vue')
    },
    {
      path: '/learning',
      name: 'learning',
      component: () => import('../views/LearningView.vue')
    },
    {
      path: '/quize',
      name: 'quize',
      component: () => import('../views/CourseQuize.vue')
    },
    {
      path: '/quizeQuestions',
      name: 'quizeQuestions',
      component: () => import('../views/QuizeQuestionnaire.vue')
    }
  ]
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated() && to.name !== 'login') {
    next('/login')
  } else if (to.fullPath === '/login' && authStore.isAuthenticated()) {
    next('/home')
  } else {
    next()
  }
})

export default router
