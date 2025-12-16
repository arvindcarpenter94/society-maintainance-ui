<template>
  <Navbar v-if="showNavbar" />

  <main class="app-container">
    <router-view />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const showNavbar = computed(() => route.name !== 'Login')
</script>

<style>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>
