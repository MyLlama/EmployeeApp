import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {}
  }),
  getters: {
  }, 
  actions: {
    async getUserProfile(userId: any) {
      try {
        const headers = {
            Authorization: `Bearer VLfI6NL3jOoCctyqbLf7T8tok6AuiC`,
          };
        const response = await axios.get(`https://edx.myllama.co/api/user/v1/accounts/${userId}`, { headers });
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  }
})