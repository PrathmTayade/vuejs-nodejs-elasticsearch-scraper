<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Client Management</a>
      <router-link class="nav-link" to="/clients">Clients</router-link>
      <router-link v-if="showSearch" class="nav-link" to="/search">Search</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: true // Optional flag to control search bar visibility
    }
  },
  compatConfig: { MODE: 3 }
}
</script>

<style scoped>
/* Add Bootstrap styles here */
</style>
