import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL
const url = `${baseUrl}/oauth2/access_token`

export function useAuthStore() {
  const userId: Ref<string | null> = ref(null)
  const authToken: Ref<string | null> = ref(null)

  async function userLogin(username: string, password: string): Promise<void> {
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
    } catch (error) {
      console.error(error)
    }
  }

  const isAuthenticated: ComputedRef<boolean> = computed(() => !!authToken.value)

  return {
    userId,
    authToken,
    userLogin,
    isAuthenticated
  }
}
