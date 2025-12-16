import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: null,
    flatId: null
  }),

  actions: {
    login(token) {
      this.token = token
      localStorage.setItem('token', token)

      // decode JWT payload (simple decode, no library yet)
      const payload = JSON.parse(atob(token.split('.')[1]))
      this.role = payload.role
      this.flatId = payload.flatId
    },

    logout() {
      this.token = null
      this.role = null
      this.flatId = null
      localStorage.removeItem('token')
    }
  }
})
