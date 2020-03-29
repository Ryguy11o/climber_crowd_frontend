<template>
  <div class="announcement">
      <h1>{{ data.Name }}</h1>
      <h3>{{ data['Time Created'] }}</h3>
      <p>{{ data.Message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Announcement',
  props: {
      data: Object,
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped>
    .announcement {
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(0,0,0, 0.4);
    }

    .announcement:last-child {
        border-bottom: none;
    }

    p {
        text-align: start;
        padding: 0px 10%;
    }

    h3 {
        margin: 5px 0;
        font-weight: 400;
        color: rgba(0,0,0, 0.6);
    }

    h1 {
        margin-bottom: 5px;
    }
    
</style>
