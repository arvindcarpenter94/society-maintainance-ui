import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Flats from '../views/Flats.vue'
import Payments from '../views/Payments.vue'
import Ledger from '../views/Ledger.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/login', component: Login, meta: { public: true }},
  { path: '/', component: Login, meta: { public: true } },
  { path: '/flats', component: Flats, meta: { requiresAuth: true } },
  { path: '/payments', component: Payments, meta: { requiresAuth: true } },
  { path: '/ledger', component: Ledger, meta: { requiresAuth: true } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
