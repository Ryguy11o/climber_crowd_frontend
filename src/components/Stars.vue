<template>
  <span class="stars">
    <span
      v-if="numberStars !== -1"
      class="stars"
    >
      <img
        v-for="(star, i) in starsArray"
        :key="i"
        :src="star"
        alt=""
      >
      <span
        class="faded"
      >
        ({{ numberRatings }})
      </span>
    </span>
    <span v-else
      class="faded"
    >
      No Ratings
    </span>
  </span>
</template>

<script>
/* eslint-disable */
import fullStar from '../assets/full_star.svg';
import emptyStar from '../assets/empty_star.svg';
export default {
  name: 'Stars',
  data() {
    return {

    }
  },
  props: {
    numberStars: Number,
    numberRatings: Number,
  },
  computed: {
      starsArray() {
        const stars = [];
        const wholeStars = Math.round(this.numberStars);
        const emptyStars = 5 - wholeStars;
        for (let i = 0; i < wholeStars; i++) {
          stars.push(fullStar);
        }
        
        for (let i = 0; i < emptyStars; i++) {
          stars.push(emptyStar)
        }
        
        return stars;
    }
  },
}
</script>

<style scoped>
.stars {
  width: 110px;
  height: 20px;
  display: flex;
  align-items: center;
}

.stars img {
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
}

.faded {
  color: rgba(0,0,0,.6);
}
</style>
