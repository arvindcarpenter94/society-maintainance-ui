<template>
    <div class="login-container">
      <div class="login-card">
        <h2>Society Maintenance</h2>
  
        <form @submit.prevent="login">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
          />
  
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
  
          <button type="submit" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
  
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '../api/api'
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)
  
  const auth = useAuthStore()
  const router = useRouter()
  
  const login = async () => {
    error.value = ''
    loading.value = true
  
    try {
      const res = await api.post('/auth/login', {
        username: username.value,
        password: password.value
      })
  
      auth.login(res.data.token)
  
      // Redirect based on role
      if (auth.role === 'OWNER') {
        router.push('/my-ledger')
      } else {
        router.push('/dashboard')
      }
    } catch (e) {
      error.value = 'Invalid username or password'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f6fa;
  }
  
  .login-card {
    width: 320px;
    padding: 24px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .login-card h2 {
    text-align: center;
    margin-bottom: 16px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background: #aaa;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  </style>  