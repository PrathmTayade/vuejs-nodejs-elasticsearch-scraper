import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ClientForm from '@/views/ClientForm.vue'
import ClientDetails from '@/views/ClientDetails.vue'
import ClientList from '@/views/ClientList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ClientList },
    { path: '/clients', redirect:"/" },
    { path: '/clients/new', component: ClientForm },
    { path: '/clients/edit/:id', component: ClientForm },
    { path: '/clients/:id', component: ClientDetails },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router