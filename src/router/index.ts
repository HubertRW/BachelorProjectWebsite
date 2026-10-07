import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import UpdatesView from '@/views/UpdatesView.vue'
import DocsView from '@/views/DocsView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/updates',
      name: '/updates',
      component: UpdatesView,
    },
    {
      path: '/documentation',
      name: '/documentation',
      component: DocsView,
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
