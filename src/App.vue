<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {

    }
  },
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
}
#app {

}
</style>
