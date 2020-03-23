<template>
  <div id="app">
    <h1>Current Routes</h1>
    <div v-if="routes !== null">
      <route
        v-for="route in routes"
        :key="route.fields.ID"
        :data="route.fields"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Route from './components/Route.vue'

export default {
  name: 'App',
  components: {
    Route
  },
  data() {
    return {
      routes: [],
    }
  },
  methods: {
    fetchRoutes() {
      axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/routes`)
      .then(response => {
        this.routes = response.data;
      });
    },
  },
  mounted() {
      this.fetchRoutes();
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px, 20%;
  font-family: 'Roboto Condensed', sans-serif;
}
</style>
