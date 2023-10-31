import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const { userId, authToken } = storeToRefs(useAuthStore())

export const useUserStore = defineStore('user', () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const user = ref({})

  async function fetchUserProfile() {
    try {
      const token = authToken.value
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.get(`${baseUrl}/api/user/v1/accounts/${userId.value}`, {
        headers
      })
      user.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchUserProfile,
    user
  }
})
