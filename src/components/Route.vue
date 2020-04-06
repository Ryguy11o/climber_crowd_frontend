<template>
  <div class="grid-item">
    <div class="card-flex">
      <div
      v-if="data.Color !== undefined"
      :style="routeColor"
      class="routeColor"
    ></div>
    <div class="card-top">
      <div class="title-row">
        <h2 class="title">{{ displayName }}</h2>
        <h2>{{ data.Grade }}</h2>
      </div>
      <div
        class="review"
      >
        <stars :numberStars="ratingAverage" :numberRatings="data.ratings.length"/>
        <span 
          @click="openModal()"
          class="review-button"
        >
          Rate this route
          <i class="gg-smile"></i>
        </span>
      </div>
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
    <Modal
      v-if="showModal"
      @close="showModal = !showModal"
      :routeName="displayName"
      :routeData="data"
    />
  </div>
</template>

<script>
import Modal from './Modal';
import Stars from './Stars';
export default {
  name: 'Route',
  components: {
    Modal,
    Stars,
  },
  data() {
    return {
      showModal: false,
    }
  },
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
      return this.data.Color ? {
        'background-color': this.data.Color
      } : {};
    },
    ratingAverage() {
      if(this.data.ratings.length !== 0) {
        return this.data.ratings.reduce((a,b) => a + b, 0) / this.data.ratings.length;
      } else {
        return -1;
      }
    },
  },
  methods: {
    openModal() {
      this.showModal = true;
    }
  },
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

.review {
  padding: 0 15px 15px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.review-button:hover {
  cursor: pointer;
  color:rgba(2, 118, 253, 1);
}

.review-button {
  padding: 5px 0;
  color: rgba(2, 118, 253, .8);
  display: flex;
  justify-content: space-between;
}

.gg-smile {
  margin-left: 5px;
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

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 5px 15px;
}

.card-top {
  display: flex;
  flex-direction: column;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: auto;
  background-color:rgba(0, 0, 0, 0.05);
  color: rgba(0,0,0,.6);
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
