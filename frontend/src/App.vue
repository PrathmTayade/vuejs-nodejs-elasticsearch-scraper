<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light gap-2">
      <a class="navbar-brand" href="#">Company Management</a>
      <router-link class="nav-link" to="/clients">Companies</router-link>
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
}
</script>

<style scoped>
/* Add Bootstrap styles here */
</style>
