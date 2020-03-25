<template>
  <div class="RoutePage">
    <h1>Bouldering</h1>
    <div 
        v-if="boulderingRoutes !== null"
    >
        <div
            v-for="[key, value] of Object.entries(boulderingRoutesByGrade)"
            :key="key"
        >
            <h1
                class="grade"
            >
                <span>
                    {{ key }}
                </span>
                <span>
                    {{ `${value.length} Routes`}}
                </span>
            </h1>
            <div
                class="row"
            >
                <route
                v-for="route in value"
                :key="route.fields.ID"
                :data="route.fields"
                />
            </div>
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
    }
  },
  computed: {
      boulderingRoutesByGrade() {
          const routesByGrade = {};
          this.boulderingRoutes.forEach(route => {
              if (routesByGrade[route.fields.Grade] !== undefined) {
                  console.log(routesByGrade[route.fields.Grade]);
                  routesByGrade[route.fields.Grade].push(route);
              } else {
                  routesByGrade[route.fields.Grade] = [route];
              }
          });

          console.log(routesByGrade);
          return routesByGrade;
      },
  },
  methods: {
    fetchBoulderingRoutes() {
      axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/routes`)
      .then(response => {
        this.boulderingRoutes = response.data;
        console.log(this.boulderingRoutesByGrade);
      });
    },
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
  align-items: center;
  justify-content: center;
  margin: 0 5%;
  font-family: 'Roboto Condensed', sans-serif;
}

.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
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
}
</style>
