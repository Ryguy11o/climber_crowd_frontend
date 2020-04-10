import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import RoutePage from './components/RoutePage.vue';
import AnnouncementPage from './components/AnnouncementPage.vue';
import FeedbackPage from './components/FeedbackPage.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/feedback', component: FeedbackPage},
  { path: '/routes', component: RoutePage },
  { path: '/', component: AnnouncementPage },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
