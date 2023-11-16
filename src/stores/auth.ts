import axios from 'axios'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core' // For state persistance
import { useRouter } from 'vue-router'
const baseUrl = import.meta.env.VITE_BASE_URL
const url = `${baseUrl}/oauth2/access_token`

export const useAuthStore = defineStore('auth', () => { 
  const router = useRouter() 
  const authToken = useStorage('authToken', '')
  const userId = useStorage('userId', '')
  const validityDuration = useStorage('validityDuration', 0)
  let timer: NodeJS.Timeout | number | null = null

  // useStorage returns a RemovableRef, which is a special type of reference that is used for reactive state management in Vue.
  
  const setTimer = (expiresIn: number) => {
    clearTimer()
    timer = setTimeout(() => {
      logout()
    }, expiresIn)
  }

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const userLogin = async (username: any, password: string): Promise<void> => {
    try {
      const response = await axios.post(url, null, {
        params: {
          username,
          password,
          grant_type: 'password',
          client_id: import.meta.env.VITE_CLIENT_ID
        }
      })
      authToken.value = response.data.access_token
      userId.value = username
      const expiresIn = +response.data.expires_in * 1000 // Convert to milliseconds
      validityDuration.value = Date.now() + expiresIn // Calculate the future time in milliseconds when the token will expire.
      setTimer(expiresIn)
    } catch (error) {
      console.error(error)
    }
  }

  const isAuthenticated = () => {
    return !!authToken.value
  }

  const logout = () => {
    if (Date.now() > validityDuration.value) {
      alert('Session Expired!')
    }
    authToken.value = ''
    userId.value = ''
    validityDuration.value = 0
    clearTimer()
    router.replace({ name: 'login' })
  }

  return {
    router,
    userLogin,
    isAuthenticated,
    authToken,
    userId,
    logout,
    
  }
})
