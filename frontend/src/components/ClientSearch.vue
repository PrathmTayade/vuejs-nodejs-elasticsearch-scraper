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

    <div class="mt-4" v-if="clients.length">
      <h2>Search Results</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="client in clients" :key="client.id">
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
  </div>
</template>

<script>
import { apiURL } from '@/lib/utils'
import axios from 'axios'

export default {
  data() {
    return {
      searchTerm: '',
      clients: []
    }
  },
  methods: {
    searchClients() {
      axios
        .get(`${apiURL}/api/es/clients/search`, { params: { q: this.searchTerm } })
        .then((response) => {
          this.clients = response.data
        })
        .catch((error) => {
          console.error('There was an error searching for clients!', error)
        })
    }
  }
}
</script>
