<template>
  <div class="container">
    <h1>Clients</h1>
    <ul class="list-group">
      <li v-for="client in clients" :key="client.id" class="list-group-item">
        <a :href="`/clients/${client.id}`">{{ client.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios' // Assuming you're using Axios for API calls

export default {
  data() {
    return {
      clients: []
    }
  },
  created() {
    this.fetchClients()
  },
  compatConfig: { MODE: 3 },

  methods: {
    async fetchClients() {
      try {
        const response = await axios.get('/clients') // API endpoint for listing clients
        this.clients = response.data
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Add Bootstrap styles for list formatting */
</style>
