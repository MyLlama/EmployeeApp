// import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

export function useAuthStore() {
  const userId: Ref<string | null> = ref(null)
  const authToken: Ref<string | null> = ref(null)

  async function userLogin(username: string, password: string): Promise<void> {
    try {
      const response = await axios.post(baseUrl, null, {
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

// export const useAuthStore = defineStore({
//   id: 'auth',
//   state: () => ({
//     userId: null,
//     authToken: null
//   }),
//   actions: {
//     async userLogin(username: string, password: string) {
//       try {
//         const response = await axios.post(baseUrl, null, {
//           params: {
//             username,
//             password,
//             grant_type: 'password',
//             client_id: import.meta.env.VITE_CLIENT_ID
//           }
//         })
//         this.authToken = response.data.access_token
//       } catch (error) {
//         console.error(error)
//       }
//     }
//   },
//   getters: {
//     isAuthenticated(state) {
//       return !!state.authToken
//     }
//   }
// })
