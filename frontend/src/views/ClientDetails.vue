<template>
  <div class="container mt-5">
    <h1>Client Detail</h1>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ client.name }}</h5>
        <p class="card-text"><strong>ID:</strong> {{ client.id }}</p>
        <p class="card-text"><strong>CIN:</strong> {{ client.cin }}</p>
        <p class="card-text"><strong>Status:</strong> {{ client.status }}</p>
        <p class="card-text"><strong>Address:</strong> {{ client.address }}</p>
        <p class="card-text"><strong>Email:</strong> {{ client.email }}</p>
        <p class="card-text"><strong>PIN:</strong> {{ client.pin }}</p>
        <p class="card-text"><strong>Directors:</strong></p>
        <b-list-group class="list-group">
          <ul class="list-group-item" v-for="(director, index) in client.directors" :key="index">
            <strong>Name:</strong>
            {{
              director.name || 'No Records.'
            }}<br />
            <strong>DIN:</strong>
            {{
              director.din || 'No Records.'
            }}<br />
            <strong>Designation:</strong>
            {{
              director.designation || 'No Records.'
            }}<br />
            <strong>Appointment Date:</strong>
            {{
              director.appointmentDate || 'No Records.'
            }}
          </ul>
        </b-list-group>

        <button @click="editClient" class="btn btn-secondary m-2">Edit</button>
        <button @click="deleteClient" class="btn btn-danger m-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiURL } from '@/lib/utils'
import axios from 'axios'

export default {
  data() {
    return {
      client: {
        id: '',
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
    editClient() {
      this.$router.push({
        name: 'EditClient',
        path: `/clients/edit/${this.$route.params.id}`
      })
    },
    deleteClient() {
      try {
        axios.delete(`${apiURL}/api/es/clients/${this.$route.params.id}`).then(() => {
          alert('Client deleted successfully!')
          this.$router.push('/')
          this.$root.$emit('fetchClients')
        })
      } catch (error) {
        console.error('Error deleting client:', error)
        this.$message.error('An error occurred while deleting the client!')
      }
    }
  }
}
</script>
