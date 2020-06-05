import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'
import vuelidate from 'vuelidate'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'nprogress/nprogress.css'
// import VueCoreVideoPlayer from 'vue-core-video-player'
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

import './assets/css/background.css'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.use(vuelidate)

// Vue.use(
//   VueVideoPlayer /* {
//   options: global default options,
//   events: global videojs events
// } */
// )

// const custom = {
//   "dashboard": {
//     "btn": {
//       "pause": "일시적인",
//       "fullscreen": "전체화면",
//       "exitFullscreen": "전체 화면 종료",
//       "last": "test"
//     }
//   }
// }
// const en = JSON.stringify(custom)

// Vue.use(VueCoreVideoPlayer, {
//   lang: en
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created() {
    let token = localStorage.getItem('hypertube')

    if (token) {
      token = JSON.parse(token)
      if (Math.floor(token.exp) - Math.floor(Date.now() / 1000) > 60 * 10) {
        this.$store.commit('App/SET_TOKEN', token)
        this.$store.commit('App/SET_AUTH', true)
        // router.push({ name: 'movies' })
        this.$store.dispatch('App/getUser', '')
        this.$router.push({ name: 'home' })
      }
    }
  },
  render: h => h(App),
}).$mount('#app')
