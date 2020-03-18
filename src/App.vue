<template>
  <div id="app">
    <route msg="Welcome to Your Vue.js App DFAKDJFIASDJFOIJFOAIJODASJ"/>
  </div>
</template>

<script>
import Route from './components/Route.vue'

export default {
  name: 'App',
  components: {
    Route
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
}
</style>
