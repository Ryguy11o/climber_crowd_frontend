<template>
  <div class="RoutePage">
    <!-- Bouldering Section -->
    <h1
        @click="expandBouldering()"
        class="title bouldering"
    >
        <div 
            class="layer"
        >
            Bouldering
        </div>
    </h1>
    <transition name="slide">
        <div 
            v-if="boulderingRoutes !== null && boulderingExpanded === true"
        >
            <p class="difficulty">Scale: Beginner V0 - V2, Intermediate V3 - V5, Advanced V5+</p>
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
    <!-- Top Rope Section -->
        <h1
        @click="expandTopRope()"
        class="title top-rope"
    >
        <div 
            class="layer"
        >
            Top Roping
        </div>
    </h1>
    <transition name="slide">
        <div 
            v-if="topRopeRoutes !== null && topRopeExpanded === true"
        >
            <p class="difficulty">Scale: Beginner 5.5 - 5.7, Intermediate 5.8 - 5.10, Advanced 5.10+</p>
            <div
                v-for="[key, value] of Object.entries(TopRoutesByGrade)"
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
    <!-- Lead Section -->
    <h1
        @click="expandLead()"
        class="title lead"
    >
        <div 
            class="layer"
        >
            Sport Climbing
        </div>
    </h1>
    <transition name="slide">
        <div 
            v-if="leadRoutes !== null && leadExpanded === true"
        >
            <p class="warning">Warning: Sport climbing involves more risk - Intermediate and Advanced Climbers only.</p>
            <p class="difficulty">Scale: Beginner 5.5 - 5.7, Intermediate 5.8 - 5.10, Advanced 5.10+</p>
            <div
                v-for="[key, value] of Object.entries(leadByGrade)"
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
      topRopeRoutes: [],
      leadRoutes: [],
      expandedGrades: {},
      boulderingExpanded: false,
      topRopeExpanded: false,
      leadExpanded: false,
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
      TopRoutesByGrade() {
          const routesByGrade = {};
          this.topRopeRoutes.forEach(route => {
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
      leadByGrade() {
          const routesByGrade = {};
          this.leadRoutes.forEach(route => {
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
      .get(`${process.env.VUE_APP_BASE_URL}/api/bouldering`)
      .then(response => {
        this.boulderingRoutes = response.data;
      });
    },
    fetchTopRopeRoutes() {
      axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/wall/top-roping`)
      .then(response => {
        this.topRopeRoutes = response.data;
      });
    },
    fetchLeadRoutes() {
      axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/wall/lead`)
      .then(response => {
        this.leadRoutes = response.data;
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
        const bool = this.boulderingExpanded;
        this.boulderingExpanded = !bool;
    },
    expandTopRope() {
        const bool = this.topRopeExpanded;
        this.topRopeExpanded = !bool;
    },
    expandLead() {
        const bool = this.leadExpanded;
        this.leadExpanded = !bool;
    }
  },
  mounted() {
      Promise.all([
          this.fetchBoulderingRoutes(),
          this.fetchTopRopeRoutes(),
          this.fetchLeadRoutes(),
      ]);
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

.difficulty {
    color: rgba(0,0,0,.7);
    text-align: center;
}

.warning {
    color: #ffae42;
    text-align: center;
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
    width: 20px;
    padding-top: 5px;
    transition: .3s;
}

.arrow_up {
    width: 20px;
    padding-top: 0px;
    transform: rotate(180deg);
    transition: .3s;
}

.number-routes {
    margin-right: 10px;
    font-weight: 400;
    font-size: .66em;
}

.number-routes-container {
    display: flex;
    align-items: center;
}

.title {
    align-self: center;
    padding: 2em 0;
    margin: .33em auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 30%;
    width: 100%;
    text-align: center;
    color: white;
    border-radius: 4px;
}

.bouldering {
    background-image: url('../assets/bouldering.jpg');
}

.top-rope {
    background-image: url('../assets/top-rope.jpg');
}

.lead {
    background-image: url('../assets/lead.jpg');
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
