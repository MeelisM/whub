import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/expected',
      name: 'expected',
      component: () => import('../views/ExpectedView.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/LeaderboardView.vue'),
    },
    {
      path: '/moe',
      name: 'moe',
      component: () => import('../views/MoeView.vue'),
    },
    {
      path: '/mastery',
      name: 'mastery',
      component: () => import('../views/MasteryView.vue'),
    },
  ],
});

export default router;
