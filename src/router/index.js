import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (routeTo.query.code) {
        console.log(routeTo.query.code)
        // demander l'access token au back
        // https://api.intra.42.fr/apidoc/guides/web_application_flow
        // demander aux back si profil complet
        // si oui go to movie
        // sinon go to complete profile
      }
      next()
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/activated',
    name: 'activated',
    component: () => import('../pages/Activated.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/Registration.vue'),
    props: true,
  },
  {
    path: '/user/:username',
    name: 'user',
    component: () => import('../pages/User.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('App/getUser', routeTo.params.username)
        .then(data => {
          routeTo.params.userInfo = data
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'user' } })
          }
          next({ name: 'network-issue' })
        })
    },
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../pages/Movies.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../pages/Movie.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('Movies/fetchMovie', routeTo.params.id)
        .then(movie => {
          if (parseInt(movie.id) === 0) {
            next({ name: '404', params: { resource: 'movie' } })
          }
          routeTo.params.movie = movie
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'movie' } })
          }
          next({ name: 'network-issue' })
        })
    },
  },
  {
    // Always leave this as last one
    path: '/404',
    name: '404',
    component: () => import('../pages/404.vue'),
    props: true,
  },
  {
    // Always leave this as last one
    path: '/network-issue',
    name: 'network-issue',
    component: () => import('../pages/NetworkIssue.vue'),
    props: true,
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  nprogress.start()
  if (routeTo.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['App/isAuth']) next()
    else next({ name: 'login' })
  } else next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
