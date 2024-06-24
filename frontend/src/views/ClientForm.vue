<template>
  <div class="container mt-5">
    <h1>{{ isEditing ? 'Edit Client' : 'Create Client' }}</h1>
    <form @submit.prevent="submitClient">
      <!-- Client form fields -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="client.name" required />
      </div>
      <div class="mb-3">
        <label for="cin" class="form-label">CIN (21 characters)</label>
        <input
          type="text"
          class="form-control"
          id="cin"
          v-model="client.cin"
          :maxlength="21"
          pattern="[A-Z0-9]{21}"
          title="CIN must be exactly 21 characters and alphanumeric (uppercase letters and digits)."
          required
        />
        <small v-if="!isCinValid" class="text-danger">CIN must be exactly 21 characters.</small>
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <input type="text" class="form-control" id="status" v-model="client.status" required />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input type="text" class="form-control" id="address" v-model="client.address" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="client.email" required />
      </div>
      <div class="mb-3">
        <label for="pin" class="form-label">PIN (6 digits)</label>
        <input
          type="text"
          class="form-control"
          id="pin"
          v-model="client.pin"
          :maxlength="6"
          pattern="[0-9]{6}"
          title="PIN must be exactly 6 digits."
          required
        />
        <small v-if="!isPinValid" class="text-danger">PIN must be exactly 6 digits.</small>
      </div>

      <!-- Directors section -->
      <div class="mb-3">
        <label for="directors" class="form-label">Directors</label>
        <div v-for="(director, index) in client.directors" :key="index" class="card mb-2">
          <div class="card-body">
            <div class="mb-3">
              <label :for="'directorName' + index" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                :id="'directorName' + index"
                v-model="director.name"
                required
              />
            </div>
            <div class="mb-3">
              <label :for="'directorDIN' + index" class="form-label">DIN</label>
              <input
                type="text"
                class="form-control"
                :id="'directorDIN' + index"
                v-model="director.din"
                required
              />
            </div>
            <div class="mb-3">
              <label :for="'directorDesignation' + index" class="form-label">Designation</label>
              <input
                type="text"
                class="form-control"
                :id="'directorDesignation' + index"
                v-model="director.designation"
                required
              />
            </div>
            <div class="mb-3">
              <label :for="'directorAppointmentDate' + index" class="form-label"
                >Appointment Date</label
              >
              <input
                type="date"
                class="form-control"
                :id="'directorAppointmentDate' + index"
                v-model="director.appointmentDate"
                required
              />
            </div>
            <button type="button" class="btn btn-danger" @click="removeDirector(index)">
              Remove Director
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click="addDirector">Add Director</button>
      </div>

      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import { apiURL } from '@/lib/utils'
import axios from 'axios'

export default {
  data() {
    return {
      client: {
        name: '',
        cin: '',
        status: '',
        address: '',
        email: '',
        pin: '',
        directors: []
      },
      isEditing: true,
      isCinValid: true,
      isPinValid: true
    }
  },
  compatConfig: { MODE: 3 },
  created() {
    this.isEditing = this.$route.name === 'EditClient'
    if (this.isEditing) {
      this.fetchClient()
    }
  },
  methods: {
    fetchClient() {
      axios.get(`${apiURL}/api/es/clients/${this.$route.params.id}`).then((response) => {
        this.client = response.data
      })
    },
    submitClient() {
      // Validate CIN and PIN
      this.isCinValid = this.client.cin.length === 21
      this.isPinValid = /^\d{6}$/.test(this.client.pin)

      if (this.isCinValid && this.isPinValid) {
        const url = this.isEditing
          ? `${apiURL}/api/es/clients/${this.$route.params.id}`
          : `${apiURL}/api/es/clients`
        const method = this.isEditing ? 'put' : 'post'

        axios[method](url, this.client)
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => {
            console.error('There was an error submitting the client!', error)
          })
      }
    },
    addDirector() {
      this.client.directors.push({
        din: '',
        name: '',
        designation: '',
        appointmentDate: ''
      })
    },
    removeDirector(index) {
      this.client.directors.splice(index, 1)
    }
  }
}
</script>
