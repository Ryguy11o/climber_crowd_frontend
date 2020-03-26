<template>
  <div class="RoutePage">
    <h1
        class="title"
    >Bouldering</h1>
    <div 
        v-if="boulderingRoutes !== null"
    >
        <div
            v-for="[key, value] of Object.entries(boulderingRoutesByGrade)"
            :key="key"
        >
            <h1
                class="grade"
                @click="expandMenu(key)"
            >
                <span>
                    {{ key }}
                </span>
                <span class="number-routes-container">
                    <span
                        class="number-routes"
                    >
                        {{ `${value.length} Routes`}}
                    </span>
                    <img
                        src="../assets/down_arrow.png"
                        :class="flipArrow(key)"
                    />
                </span>
            </h1>
            <transition name="slide">
                <div
                    v-if="expandedGrades[key]"
                    class="row"
                >
                    <route
                    v-for="route in value"
                    :key="route.fields.ID"
                    :data="route.fields"
                    />
                </div>
            </transition>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Route from './Route.vue'

export default {
  name: 'RoutePage',
  components: {
    Route
  },
  data() {
    return {
      boulderingRoutes: [],
      expandedGrades: {},
    }
  },
  computed: {
      boulderingRoutesByGrade() {
          const routesByGrade = {};
          this.boulderingRoutes.forEach(route => {
              if (routesByGrade[route.fields.Grade] !== undefined) {
                  routesByGrade[route.fields.Grade].push(route);
              } else {
                  routesByGrade[route.fields.Grade] = [route];
              }

              if (this.expandedGrades[route.fields.Grade] === undefined) {
                  this.$set(this.expandedGrades, route.fields.Grade, false);
              }
          });

          return routesByGrade;
      },
  },
  methods: {
    fetchBoulderingRoutes() {
      axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/routes`)
      .then(response => {
        this.boulderingRoutes = response.data;
      });
    },
    expandMenu(key) {
        this.$set(this.expandedGrades, key, !this.expandedGrades[key]);
    },
    flipArrow(key) {
        let className = 'arrow_down';
        if (this.expandedGrades[key]) {
            className = 'arrow_up';
        }
        return className;
    }
  },
  mounted() {
      this.fetchBoulderingRoutes();
  }
}
</script>

<style>
.RoutePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 5%;
  font-family: 'Roboto Condensed', sans-serif;
}

.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  transform-origin: top;
}

.grade {
    background: linear-gradient(90deg, 
    rgba(230,0,118,1) 0%, 
    rgba(204,6,131,1) 29%,
    rgba(233,122,55,1) 67%, 
    rgba(255,173,0,1) 100%);
    color: white;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    cursor: pointer;
}

.arrow_down {
    width: 25px;
    padding-top: 5px;
    transition: .3s;
}

.arrow_up {
    width: 25px;
    padding-top: 0px;
    transform: rotate(180deg);
    transition: .3s;
}

.number-routes {
    margin-right: 10px;
}

.number-routes-container {
    display: flex;
    align-items: center;
}

.title {
    align-self: center;
}

.slide-enter, .slide-leave-to{
  height: 0;
  opacity: 0;
}
</style>
