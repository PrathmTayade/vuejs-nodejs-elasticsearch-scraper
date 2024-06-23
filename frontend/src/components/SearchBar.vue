<template>
  <div class="container">
    <form @submit.prevent="searchClients">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search clients..."
        class="form-control"
      />
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    async searchClients() {
      if (!this.searchTerm) return // Handle empty search term
      try {
        const response = await axios.get(`/es/clients/search?q=${this.searchTerm}`) // API endpoint for searching clients
        // Handle search results (display in a separate component or client list)
        return response
      } catch (error) {
        console.error('Error searching clients:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Add Bootstrap styles for search bar layout */
</style>
