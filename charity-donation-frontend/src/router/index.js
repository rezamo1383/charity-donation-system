import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Donate from '../views/Donate.vue'; // اضافه کردن صفحه Donate

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/donate', name: 'Donate', component: Donate }, // مسیر برای صفحه Donate
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
