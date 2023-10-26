import { defineStore } from 'pinia'
import axios from 'axios'


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userId: null,
    isLoggedIn: false,
    authToken: null
  }),
  actions: {
    async login(username: string, password: string) {
      const url = 'https://edx.myllama.co/oauth2/access_token'
      try {
        const response = await axios.post(url, null, {
          params: {
            username,
            password,
            grant_type: 'password',
            client_id: import.meta.env.VITE_CLIENT_ID
          }
        })
        console.log(response.data)
        this.authToken = response.data.access_token
      } catch (error) {
        console.error(error)
      }
      if (this.authToken) {
        this.isLoggedIn = true
      }
    }
    // logout() {
    //   this.isLoggedIn = false
    //   this.authToken = null
    // }
  },
  getters: {
    getLoginStatus(state) {
      return state.isLoggedIn
    }
  }
})
