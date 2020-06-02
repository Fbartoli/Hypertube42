import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import store from '../store/index'

Vue.use(VueRouter)

// const defaultPhoto = "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"
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (routeTo.query.code) {
        let code = routeTo.query.code
        store.dispatch('App/token', routeTo.query.code)
        store.commit('App/SET_AUTH', true)
        let info = code.split('.')
        let userInfo = JSON.parse(atob(info[1]))
        let exp = userInfo.exp
        console.log('Home router_userInfo.data_ ', userInfo.data)
        // store.commit('App/PUT_USERNAME', userInfo.data.username)
        localStorage.setItem('hypertube', JSON.stringify({ code, exp }))
        store.commit(
          'App/RESET_LOCALSTORAGE_USERNAME',
          userInfo.data.username,
          userInfo.exp,
          routeTo.query.code
        )
        // store.dispatch('App/getUserAuth')
        store.dispatch('App/getUser', '')
      }
      next()
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['App/isAuth'] === true) {
        next({ name: 'home' })
      }
      next()
    },
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
    props: true,
    meta: {
      requiresAuth: true,
    },
    // beforeEnter(routeTo, routeFrom, next) {
    //   console.log('TEST_username: ', routeTo.params.username)
    //   store
    //     .dispatch('App/getUser', routeTo.params.username)
    //     .then(data => {
    //       routeTo.params.userInfo = data
    //       next()
    //     })
    //     .catch(error => {
    //       if (error.response.status === 404) {
    //         next({ name: '404', params: { resource: 'user' } })
    //       }
    //       next({ name: 'network-issue' })
    //     })
    // },
  },
  {
    path: '/profile/:profile',
    name: 'profile',
    component: () => import('../pages/Profile.vue'),
    props: true,
    meta: {
      requiresAuth: true,
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
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('Movies/getViews')
      next()
    },
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../pages/Movie.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('Movies/fetchMovie', routeTo.params.id)
        .then(movie => {
          if (parseInt(movie.id) === 0) {
            next({ name: '404', params: { resource: 'movie' } })
          }
          routeTo.params.movie = movie
          store.dispatch('Movies/getComments', routeTo.params.id)
          store.dispatch('Movies/sendView', routeTo.params.id)
          next()
        })
        .catch(error => {
          if (error.response.status === 404) {
            next({ name: '404', params: { resource: 'movie' } })
          }
          next({ name: 'network-issue' })
        })
    },
  },

  // Valid your new account by using the link in your mailbox:
  {
    path: '/signup/:signup',
    name: 'signup',
    component: () => import('../pages/Signup.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('Email/setActivationToken', routeTo.params.signup)
      store.dispatch('Email/getActivationToken')
      next()
    },
  },

  // Choose a profile picture on your first login (or until change):
  {
    path: '/setpicture',
    name: 'setpicture',
    component: () => import('../pages/SetPicture.vue'),
    // meta: {
    //   requiresProfileComplete: true,
    // },
    // beforeEnter(routeTo, routeFrom, next) {
    //   if (store.getters['App/storeDefaultPicture']) {
    //     if (store.getters['App/storeDefaultPicture'] === true) {
    //       next()
    //     } else {
    //       next({ name: 'movies' })
    //     }
    //   }
    //   next()
    // },
    // beforeRouteLeave(routeTo, routeFrom, next) {
    //   test
    // }
  },

  // Valid your email change by using the link in your mailbox:
  {
    path: '/resetemail/:resetemail',
    name: 'resetemail',
    component: () => import('../pages/Resetemail.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('Email/setEmailToken', routeTo.params.resetemail)
      store.dispatch('Email/getEmailToken')
      next()
    },
  },
  // Valid your password change online:
  {
    path: '/resetpasswordonline',
    name: 'resetpasswordonline',
    component: () => import('../pages/ResetPasswordOnline.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  // Ask for a new password while disconnected,
  // the user receives a clikable link by email:
  {
    path: '/resetpassworddscemail',
    name: 'resetpassworddscemail',
    component: () => import('../pages/ResetPasswordDscEmail.vue'),
  },
  // should be closely followed by:
  //
  // Valid your password change while disconnected
  // by using the link in your mailbox:
  {
    path: '/resetpassworddscvalid/:resetpassword',
    name: 'resetpassworddscvalid',
    component: () => import('../pages/ResetPasswordDscValid.vue'),
    props: true,
    // beforeEnter(routeTo) {
    //   store.dispatch('Email/setPasswordToken', routeTo.params.resetpassword)
    // }
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
  if (store.getters['Email/storeChecker'] === 'OK') {
    store.dispatch('Email/resetChecker')
  }
  // if (routeTo.matched.some(record => record.meta.requiresProfileComplete)) {
  //   if (store.getters['App/storeDefaultPicture']) {
  //     if (store.getters['App/storeDefaultPicture'] === true) {
  //       next()
  //     }
  //   } // else next({ name: 'movies' })
  // }
  if (routeTo.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['App/isAuth']) {
      // console.log('* * * * * * *_isAuth_')
      // console.log('routeTo', routeTo.name)
      console.log('routeFrom', routeFrom.name)

      if (store.getters['App/storeDefaultPicture']) {
        // console.log('* * * * *_storeDefaultPicture_')

        if (store.getters['App/storeDefaultPicture'] === true) {
          // console.log('* * *_TRUE_')
          // next(false)

          if (routeFrom.name !== 'setpicture') {
            // console.log('*_routeFrom.name !== setpicture_')
            next({ name: 'setpicture' })
            // next(false)
          } else {
            // console.log('*_routeFrom.name is setpicture_')
            // next(false)
            next({ name: 'setpicture' })
            // next(false)
          }
        } else next()
      } else next()
    } else next({ name: 'login' })
  } else next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
