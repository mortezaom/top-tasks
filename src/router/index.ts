import {createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearningView from '../views/LearningView.vue'
import TasksView from '../views/TasksView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: HomeView
    },
    {
      path: '/learning',
      name: 'learning',
      component: LearningView,
    },
    {
      path: '/tasks/:id',
      name: 'tasks',
      component: TasksView
    }
  ]
})

export default router
