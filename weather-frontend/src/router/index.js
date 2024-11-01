import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import WeatherResults from '../views/WeatherResults.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/results',
    name: 'WeatherResults',
    component: WeatherResults,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
