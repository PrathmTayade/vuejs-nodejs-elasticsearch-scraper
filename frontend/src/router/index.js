import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ClientForm from '@/views/ClientForm.vue'
import ClientDetails from '@/views/ClientDetails.vue'
import ClientList from '@/views/ClientList.vue'
import ClientSearch from '@/views/ClientSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ClientList },
    { path: '/clients', redirect: '/' },
    { path: '/search', component: ClientSearch },
    { path: '/clients/new', component: ClientForm },
    { path: '/clients/edit/:id', component: ClientForm, name: 'EditClient' },
    { path: '/clients/create', component: ClientForm, name: 'CreateClient' },

    { path: '/clients/:id', component: ClientDetails }
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
