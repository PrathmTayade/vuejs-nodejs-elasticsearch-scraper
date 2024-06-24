<template>
  <div class="container mt-5">
    <h1>Clients</h1>
    <button class="btn btn-success mb-3" @click="createClient">Create New Client</button>
    <div v-if="clients.length">
      <ul class="list-group mb-3">
        <li class="list-group-item" v-for="client in clients" :key="client.id">
          <div><strong>Name:</strong> {{ client._source.name }}</div>
          <div><strong>CIN:</strong> {{ client._source.cin }}</div>
          <div><strong>Email:</strong> {{ client._source.email }}</div>

          <router-link :to="`/clients/${client._id}`" class="btn btn-primary mt-2"
            >View Details</router-link
          >
        </li>
      </ul>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="fetchClients(currentPage - 1)">Previous</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="fetchClients(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="fetchClients(currentPage + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else>
      <p>No clients found.</p>
    </div>
  </div>
</template>

<script>
import { apiURL } from '@/lib/utils'
import axios from 'axios'

export default {
  data() {
    return {
      clients: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  compatConfig: { MODE: 3 },

  created() {
    this.fetchClients(this.currentPage)
  },
  methods: {
    fetchClients(page) {
      if (page < 1 || page > this.totalPages) return

      axios
        .get(`${apiURL}/api/es/clients`, { params: { page, limit: 10 } })
        .then((response) => {
          this.clients = response.data.clients
          this.currentPage = response.data.currentPage
          this.totalPages = response.data.totalPages
        })
        .catch((error) => {
          console.error('There was an error fetching the clients!', error)
        })
    },
    createClient() {
      this.$router.push({
        name: 'CreateClient',
        path: '/clients/create'
      })
    }
  }
}
</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>
