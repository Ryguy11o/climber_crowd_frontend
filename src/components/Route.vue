<template>
  <div class="card">
    <div class="top-row">
      <h1 class="title">This is a Test Route name</h1>
      <H2>OTHER</H2>
    </div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 20px;
  border-radius: 15px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  max-width:75%;
  word-wrap:break-word;
}

h1, h2 {
  margin-top: 0px;
}

h2 {
  padding: 10px, 20px;
  border-radius: 15px;
  background-color: yellow;
}
</style>
