<template>
  <div class="container mt-5">
    <h1>{{ isEditing ? 'Edit Client' : 'Add Client' }}</h1>
    <form @submit.prevent="saveClient">
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
      <div class="mb-3">
        <label for="directors" class="form-label">Directors</label>
        <input
          type="text"
          class="form-control"
          id="directors"
          v-model="newDirector"
          placeholder="Add director"
          @keyup.enter="addDirector"
        />
        <div class="mt-2">
          <span
            class="badge bg-secondary me-2"
            v-for="(director, index) in client.directors"
            :key="index"
          >
            {{ director }}
            <button
              type="button"
              class="btn-close btn-close-white ms-1"
              @click="removeDirector(index)"
            ></button>
          </span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import { apiURL } from '@/lib/utils';
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
      newDirector: '',
      isEditing: false
    }
  },
  created() {
    if (this.$route.params.id) {
      this.isEditing = true
      this.fetchClient()
    }
  },
  methods: {
    fetchClient() {
      axios.get(`${apiURL}/api/es/clients/${this.$route.params.id}`).then((response) => {
        this.client = response.data
      })
    },
    saveClient() {
      if (this.isEditing) {
        axios.put(`${apiURL}/api/es/clients/${this.$route.params.id}`, this.client).then(() => {
          this.$router.push('/')
        })
      } else {
        axios.post(`${apiURL}/api/es/clients`, this.client).then(() => {
          this.$router.push('/')
        })
      }
    },
    addDirector() {
      if (this.newDirector) {
        this.client.directors.push(this.newDirector)
        this.newDirector = ''
      }
    },
    removeDirector(index) {
      this.client.directors.splice(index, 1)
    }
  }
}
</script>
