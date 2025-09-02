import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component:  () => import('@/pages/NotFound.vue'),
  },
  {
    path: '/',
    name: 'IntroPage',
    component: () => import('@/pages/IntroPage.vue'),
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/:repositoryName',
    name: 'RepositoryView',
    component: () => import('@/pages/RepositoryView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.onError((error) => {
  console.error("Router error:", error);
});

export default router;