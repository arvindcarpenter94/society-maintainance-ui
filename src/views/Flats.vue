<template>

<div class="d-flex justify-content-between align-items-center mb-3">
  <h3>Flats</h3>
  <button class="btn btn-primary" @click="showModal = true">
    + Add Flat
  </button>
</div>

    <div>
      <h3>Flats</h3>
  
      <table class="table table-bordered table-striped mt-3">
        <thead class="table-dark">
          <tr>
            <th>Flat No</th>
            <th>Owner</th>
            <th>Area (sqft)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flat in flats" :key="flat.id">
            <td>{{ flat.flatNumber }}</td>
            <td>{{ flat.ownerName }}</td>
            <td>{{ flat.areaSqft }}</td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="flats.length === 0" class="text-muted">
        No flats found
      </div>
    </div>

    <!-- Add Flat Modal -->
<div class="modal fade show d-block" v-if="showModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Flat</h5>
        <button class="btn-close" @click="closeModal"></button>
      </div>

      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Flat Number</label>
          <input class="form-control" v-model="newFlat.flatNumber" />
        </div>

        <div class="mb-3">
          <label class="form-label">Owner Name</label>
          <input class="form-control" v-model="newFlat.ownerName" />
        </div>

        <div class="mb-3">
          <label class="form-label">Area (sqft)</label>
          <input type="number" class="form-control" v-model="newFlat.areaSqft" />
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">
          Cancel
        </button>
        <button class="btn btn-success" @click="saveFlat">
          Save
        </button>
      </div>
    </div>
  </div>
</div>
<div v-if="showModal" class="modal-backdrop fade show"></div>


  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '../api/api'
  
  const flats = ref([])
  
  onMounted(async () => {
    try {
      const res = await api.get('/flats')
      flats.value = res.data
    } catch (error) {
      console.error('Error loading flats', error)
    }
  })

  const showModal = ref(false)

const newFlat = ref({
  flatNumber: '',
  ownerName: '',
  areaSqft: ''
})

const closeModal = () => {
  showModal.value = false
  newFlat.value = { flatNumber: '', ownerName: '', areaSqft: '' }
}

const saveFlat = async () => {
  if (!newFlat.value.flatNumber || !newFlat.value.areaSqft) {
    alert('Flat number and area are required')
    return
  }

  await api.post('/flats', newFlat.value)
  closeModal()

  const res = await api.get('/flats')
  flats.value = res.data
}

  </script>
  