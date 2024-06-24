<template>
  <div class="container mt-5">
    <h1>Search Companies</h1>
    <form @submit.prevent="searchClients">
      <div class="mb-3">
        <label for="searchTerm" class="form-label">Search Term</label>
        <input
          type="text"
          class="form-control"
          id="searchTerm"
          v-model="searchTerm"
          placeholder="Enter ID, name, CIN, or email"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <div class="mt-4" v-if="clients.length > 0">
      <h2>Search Results</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="client in clients" :key="client._id">
          <div class="container d-flex flex-column gap-2">
            <strong>Name:</strong> {{ client._source.name }}<br />
            <strong>ID:</strong> {{ client._id }}<br />
            <strong>CIN:</strong> {{ client._source.cin }}<br />
            <strong>Email:</strong> {{ client._source.email }}<br />
            <router-link :to="`/clients/${client._id}`" class="btn btn-primary"
              >View Details</router-link
            >
          </div>
        </li>
      </ul>
    </div>
    <div v-else-if="searched && clients.length === 0" class="mt-2">
      <p>No clients found matching "{{ searchTerm }}".</p>
    </div>
    <div v-else class="mt-2">
      <p>Enter a search term to find clients.</p>
    </div>
  </div>
</template>

<script>
import { apiURL } from '@/lib/utils'
import axios from 'axios'

export default {
  data() {
    return {
      searchTerm: '',
      clients: [],
      searched: false
    }
  },
  methods: {
    searchClients() {
      axios
        .get(`${apiURL}/api/es/clients/search`, { params: { q: this.searchTerm } })
        .then((response) => {
          this.clients = response.data
          this.searched = true
        })
        .catch((error) => {
          console.error('There was an error searching for clients!', error)
        })
    }
  }
}
</script>

<style scoped></style>
