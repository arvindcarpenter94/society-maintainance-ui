<template>
    <div>
      <h3>Dashboard</h3>
  
      <!-- Summary Cards -->
      <div class="row mt-4">
        <div class="col-md-3" v-for="card in cards" :key="card.title">
          <div class="card text-center">
            <div class="card-body">
              <h6 class="text-muted">{{ card.title }}</h6>
              <h4 :class="card.class">
                {{ card.value }}
              </h4>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Flats with Due -->
      <div class="mt-5">
        <h5>Flat Account Summary</h5>
  
        <table class="table table-bordered mt-3">
          <thead class="table-dark">
            <tr>
              <th>Flat</th>
              <th>Owner</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in dueFlats" :key="f.id">
              <td>{{ f.flatNumber }}</td>
              <td>{{ f.ownerName }}</td>
              <td :class="amountClass(f.balance)">
  ₹{{ f.balance }}
</td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="!dueFlats.length" class="text-muted">
          No outstanding dues 🎉
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '../api/api'
  
  const summary = ref({})
  const dueFlats = ref([])
  
  const cards = ref([])
  const amountClass = (value) => {
  return value > 0 ? 'text-danger' : 'text-success'
}
  
  onMounted(async () => {
    const res = await api.get('/dashboard/summary')
    summary.value = res.data
  
    cards.value = [
      {
        title: 'Total Outstanding',
        value: `₹${summary.value.totalOutstanding}`,
        class: 'text-danger'
      },
      {
        title: 'Total Advance',
        value: `₹${summary.value.totalAdvance}`,
        class: 'text-success'
      },
      {
        title: 'Flats with Due',
        value: summary.value.flatsWithDue,
        class: 'text-warning'
      }
    ]
  
    const dueRes = await api.get('/dashboard/due-flats')
    dueFlats.value = dueRes.data
  })
  </script>
