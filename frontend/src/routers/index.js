import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '../views/common/AppHome.vue';
import ToDoMain from '../views/todo/ToDoMain.vue';

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/todo',
    name: 'ToDoMain',
    component: ToDoMain
  }
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
});

export default router;