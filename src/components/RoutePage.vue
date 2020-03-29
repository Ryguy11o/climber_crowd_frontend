<template>
  <div class="RoutePage">
    <h1
        class="title"
    >
        <div 
            class="layer"
            @click="expandBouldering()"
        >
            Bouldering
        </div>
    </h1>
    <transition name="slide">
        <div 
            v-if="boulderingRoutes !== null && boulderingExpanded === true"
        >
            <div
                v-for="[key, value] of Object.entries(boulderingRoutesByGrade)"
                :key="key"
            >
                <h1
                    class="grade"
                    :class="selectedGrade(key)"
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
                            src="../assets/down_arrow_black.png"
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
    </transition>
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
      boulderingExpanded: false,
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
    },
    selectedGrade(key) {
        let className = 'grade-unselected';
        if (this.expandedGrades[key]) {
            className = 'grade-selected';
        }
        return className;
    },
    expandBouldering() {
        const bool =this.boulderingExpanded
        this.boulderingExpanded = !bool;
    }
  },
  mounted() {
      this.fetchBoulderingRoutes();
  }
}
</script>

<style scoped>
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
    color: black;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: transform .2s linear;
}

.grade-unselected {
    border-bottom: solid 2px rgba(0,0,0,.1);
}

.grade-selected {
    background-color: rgba(0,0,0,.1);
    border-radius: 4px;
}

.grade:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,.1);
    border-radius: 4px;
    transform: scale(1.02);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15);
    border: none;
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
    padding: 1em 0;
    margin: .67em auto auto auto;
    background-image: url('../assets/bouldering.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 30%;
    width: 100%;
    text-align: center;
    color: white;
    border-radius: 4px;
}

.title:hover {
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15);
}

.slide-enter, .slide-leave-to{
  height: 0;
  opacity: 0;
}
</style>
