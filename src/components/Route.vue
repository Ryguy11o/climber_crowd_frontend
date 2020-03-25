<template>
  <div class="grid-item">
    <div class="card-flex">
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
.grid-item {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 8px;
  width: 315px;
  margin: 15px;
  display: inline-block;
  flex-basis: 20%;
  -ms-flex: auto;
  position: relative;
  box-sizing: border-box;
}

.card-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.275);
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

@media(max-width: 1333px) {
  .grid-item {
    flex-basis: 33.33%;
  }
}
@media(max-width: 1073px) {
   .grid-item {
    flex-basis: 33.33%;
  }
}
@media(max-width: 815px) {
  .grid-item {
    flex-basis: 50%;
  }
}
@media(max-width: 555px) {
  .grid-item {
    flex-basis: 100%;
  }
}
</style>
