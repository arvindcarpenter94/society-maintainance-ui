<template>
    <div>
      <h3>Ledger</h3>
  
      <!-- Flat Selector -->
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Select Flat</label>
          <select class="form-select" v-model="selectedFlat" @change="loadLedger">
            <option value="">Select Flat</option>
            <option v-for="f in flats" :key="f.id" :value="f.id">
              {{ f.flatNumber }} - {{ f.ownerName }}
            </option>
          </select>
        </div>
      </div>
  
      <!-- Ledger Table -->
      <table v-if="ledger.length" class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th class="text-end">Debit</th>
            <th class="text-end">Credit</th>
            <th class="text-end">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, index) in ledger" :key="index">
            <td>{{ l.date }}</td>
            <td>{{ l.type }}</td>
            <td class="text-end text-danger">
              {{ l.debit > 0 ? '₹' + l.debit : '-' }}
            </td>
            <td class="text-end text-success">
              {{ l.credit > 0 ? '₹' + l.credit : '-' }}
            </td>
            <td
              class="text-end"
              :class="l.balance >= 0 ? 'text-danger' : 'text-success'"
            >
              ₹{{ l.balance }}
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Closing Balance -->
      <div v-if="ledger.length" class="mt-3">
        <h5>
          Closing Balance:
          <span :class="closingBalance >= 0 ? 'text-danger' : 'text-success'">
            ₹{{ closingBalance }}
          </span>
        </h5>
      </div>
  
      <div v-if="selectedFlat && !ledger.length" class="text-muted">
        No ledger entries found
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import api from '../api/api'
  
  const flats = ref([])
  const selectedFlat = ref('')
  const ledger = ref([])
  
  onMounted(async () => {
    const res = await api.get('/flats')
    flats.value = res.data
  })
  
  const loadLedger = async () => {
    ledger.value = []
    if (!selectedFlat.value) return
  
    const res = await api.get(`/ledger/flat/${selectedFlat.value}`)
    ledger.value = res.data
  }
  
  const closingBalance = computed(() => {
    if (!ledger.value.length) return 0
    return ledger.value[ledger.value.length - 1].balance
  })
  </script>
  