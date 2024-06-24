<template>
  <div class="container mt-5">
    <h1>Edit Client</h1>
    <form @submit.prevent="updateClient">
      <!-- Client form fields -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="client.name" required />
      </div>
      <div class="mb-3">
        <label for="cin" class="form-label">CIN</label>
        <input type="text" class="form-control" id="cin" v-model="client.cin" required />
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
        <label for="pin" class="form-label">PIN</label>
        <input type="text" class="form-control" id="pin" v-model="client.pin" required />
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

      <button type="submit" class="btn btn-primary">Update</button>
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
      }
    }
  },
  created() {
    this.fetchClient()
  },
  methods: {
    fetchClient() {
      axios.get(`${apiURL}/api/es/clients/${this.$route.params.id}`).then((response) => {
        this.client = response.data
      })
    },
    updateClient() {
      axios
        .put(`${apiURL}/api/es/clients/${this.$route.params.id}`, this.client)
        .then(() => {
          this.$router.push(`/clients/${this.$route.params.id}`)
        })
        .catch((error) => {
          console.error('There was an error updating the client!', error)
        })
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
