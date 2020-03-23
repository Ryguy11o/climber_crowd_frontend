<template>
  <div class="card">
    <div
      :style="routeColor"
      class="routeColor"
    ></div>
    <div class="top-row">
      <h2 class="title">{{ displayName }}</h2>
      <h2>{{ data.Grade }}</h2>
    </div>
    <div class="bottom-row">
      <span >
        {{ setter }}
      </span>
      <span>
        {{ date }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    data: Object
  },
  computed: {
    displayName() {
      return this.data.Name ? this.data.Name : `Route #${this.data.index}`;
    },
    setter() {
      return this.data.Setter ? `Set by: ${this.data.Setter}` : '';
    },
    date() {
      return this.data.Date ? `Date set: ${this.data.Date}` : '';
    },
    routeColor() {
      return {
        'background-color': this.data.Color
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 8px;
  width: 90%;
  margin: 15px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.275);
  padding: 20px;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.title {
  max-width:75%;
  word-wrap:break-word;
}

.setter {
  justify-self: flex-start;
}

.date {
  justify-self: flex-end;
}

.routeColor {
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

h1, h2, h3 {
  margin: 0px;
}
</style>
