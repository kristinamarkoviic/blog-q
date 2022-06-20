import Vue from 'vue'
import VueRouter from 'vue-router'
import AllPosts from '../pages/AllPosts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AllPosts',
    component: AllPosts
  },
  {
    path: '/post/:id',
    name: 'SinglePost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../pages/SinglePost.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
