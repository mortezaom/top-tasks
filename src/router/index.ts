import { createRouter, createWebHashHistory, onBeforeRouteUpdate } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearningView from '../views/LearningView.vue'
import TasksView from '../views/TasksView.vue'
import AuthView from '../views/AuthView.vue'
import Dashboard from '../Dashboard.vue'
import { useLocalStorage } from '@vueuse/core'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: HomeView,
                },
                {
                    path: 'learning',
                    name: 'learning',
                    component: LearningView,
                },
                {
                    path: 'tasks/:id',
                    name: 'tasks',
                    component: TasksView
                }
            ],
            beforeEnter: () => {
                const user = window.localStorage.getItem("user")
                if (!user || user == null)
                    router.push('/auth')
            }
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthView,
            beforeEnter: () => {
                const user = window.localStorage.getItem("user")
                if (user && user != null)
                    router.push('/')

            }
        },
    ],
})

export default router
