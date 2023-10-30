import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const baseUrl = import.meta.env.VITE_BASE_URL
const url = `${baseUrl}/oauth2/access_token`

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref('')
  const userId = ref('')

  async function userLogin(username: any, password: string): Promise<void> {
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
    } catch (error) {
      console.error(error)
    }
  }

  function isAuthenticated() {
    return !!authToken.value
  }

  return {
    userLogin,
    isAuthenticated,
    authToken,
    userId
  }
})
