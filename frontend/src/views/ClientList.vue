<template>
  <div class="container mt-5">
    <h1>Client List</h1>
    <div class="list-group">
      <div
        v-for="client in clients"
        :key="client._id"
        class="list-group-item list-group-item-action"
        @click="viewClient(client._id)"
      >
        {{ client._source.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      clients: []
    }
  },
  compatConfig: { MODE: 3 },
  created() {
    this.fetchClients()
  },
  methods: {
    fetchClients() {
      axios.get('http://localhost:3000/api/es/clients/').then((response) => {
        console.log(response)
        this.clients = response.data
      })
    },
    viewClient(id) {
      this.$router.push(`/clients/${id}`)
    }
  }
}
</script>
