<template>
    <div class="row">
      <!-- LEFT: Payment Form -->
      <div class="col-md-6">
        <h3>Record Payment</h3>
  
        <div class="mb-3">
          <label class="form-label">Flat</label>
          <select class="form-select" v-model="payment.flatId" @change="loadBalance">
            <option value="">Select Flat</option>
            <option v-for="f in flats" :key="f.id" :value="f.id">
              {{ f.flatNumber }} - {{ f.ownerName }}
            </option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Payment Date</label>
          <input type="date" class="form-control" v-model="payment.paymentDate" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Amount</label>
          <input type="number" class="form-control" v-model="payment.amount" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Payment Mode</label>
          <select class="form-select" v-model="payment.paymentMode">
            <option>CASH</option>
            <option>UPI</option>
            <option>BANK</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Reference No</label>
          <input type="text" class="form-control" v-model="payment.referenceNo" />
        </div>
  
        <button class="btn btn-primary" @click="submitPayment">
          Save Payment
        </button>
      </div>
  
      <!-- RIGHT: Balance Preview -->
      <div class="col-md-6">
        <h4>Flat Summary</h4>
  
        <div v-if="balance !== null" class="card mt-3">
          <div class="card-body">
            <p>
              <strong>Current Balance:</strong>
              <span :class="balance >= 0 ? 'text-danger' : 'text-success'">
                ₹{{ balance }}
              </span>
            </p>
  
            <p v-if="payment.amount">
              <strong>After Payment:</strong>
              <span :class="afterPayment >= 0 ? 'text-danger' : 'text-success'">
                ₹{{ afterPayment }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import api from '../api/api'
  
  const flats = ref([])
  const balance = ref(null)
  
  const payment = ref({
    flatId: '',
    paymentDate: '',
    amount: '',
    paymentMode: 'CASH',
    referenceNo: ''
  })
  
  onMounted(async () => {
    const res = await api.get('/flats')
    flats.value = res.data
  })
  
  const loadBalance = async () => {
    balance.value = null
    if (!payment.value.flatId) return
  
    const res = await api.get(`/ledger/flat/${payment.value.flatId}`)
    const ledger = res.data
  
    if (ledger.length > 0) {
      balance.value = ledger[ledger.length - 1].balance
    } else {
      balance.value = 0
    }
  }
  
  const afterPayment = computed(() => {
    if (!balance.value || !payment.value.amount) return balance.value
    return balance.value - payment.value.amount
  })
  
  const submitPayment = async () => {
    await api.post('/payments', payment.value)
    alert('Payment recorded successfully')
    loadBalance()
  }
  </script>
  