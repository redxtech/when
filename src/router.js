import { createRouter, createWebHistory } from 'vue-router'

import index from './pages/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: async () => {
    //     return import('./pages/projects.vue')
    //   }
    // },
    {
      path: '/*',
      name: 'notfound',
      component: index // TODO: switch to error page
    }
  ]
})
