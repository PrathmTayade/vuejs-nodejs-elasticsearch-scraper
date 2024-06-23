<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    clientId: { // Optional prop for editing existing client
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      // Define client data fields
    };
  },
  created() {
    if (this.clientId) {
      this.fetchClient(this.clientId);
    }
  },
  methods: {
  async fetchClient(id) {
    try {
      const response = await axios.get(`/clients/${id}`); // API endpoint for getting a client
      this.name = response.data.name; // Update form data with retrieved client details
      // Set other data fields based on response
      this.isEditing = true; // Flag to indicate editing mode
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  },
  async submitForm() {
    const data = {
      name: this.name,
      // Add other client data fields
    };
    try {
      if (this.isEditing) {
        await axios.put(`/clients/${this.clientId}`, data); // API endpoint for updating a client
      } else {
        await axios.post('/clients', data); // API endpoint for creating a new client
      }
      this.$router.push('/clients'); // Redirect to client list after successful operation
    } catch (error) {
      console.error('Error submitting client form:', error);
      // Handle form submission errors (optional)
    }
  },
}}