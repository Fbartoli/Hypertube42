<template>
  <v-app>
    <v-app-bar hide-on-scroll color="secondary" app>
      <!-- -->
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">{{ appName }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-btn :to="{ name: 'login' }">{{ $t("sign in") }}</v-btn> -->
      <v-btn
        class="mx-5"
        color="primary"
        v-show="userInfo.auth === true"
        :label="$t('movies')"
        :to="{ name: 'movies', params: { page: 1 } }"
        >{{ $t('movies') }}</v-btn
      >
      <v-btn
        class="mx-5"
        color="primary"
        v-show="userInfo.auth === true"
        :label="$t('user')"
        :to="{ name: 'user/' + userInfo.username }"
        >{{ $t('user') }}</v-btn
      >
      <v-btn
        @click="logout"
        class="mx-5"
        color="primary"
        v-show="userInfo.auth === true"
        :label="$t('sign out')"
        :to="{ name: 'home' }"
        >{{ $t('sign out') }}</v-btn
      >
      <v-btn
        class="mx-5"
        color="primary"
        v-show="!userInfo.auth"
        :to="{ name: 'login' }"
        >{{ $t('sign in') }}
      </v-btn>
      <v-avatar v-show="userInfo.avatar">
        <img :src="userInfo.avatar" :alt="userInfo.username" />
      </v-avatar>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer absolute app>
      <div>
        <v-select v-model="$root.$i18n.locale" :items="langs" />
      </div>
      <v-spacer></v-spacer>
      <NotificationContainer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NotificationContainer from './components/NotificationContainer'
export default {
  name: 'App',
  components: { NotificationContainer },
  methods: {
    ...mapActions([]),
    logout() {
      localStorage.removeItem('hypertube')
    },
  },
  computed: {
    ...mapState({
      langs: state => state.App.langs,
      appName: state => state.App.appName,
      userInfo: state => state.App.userInfo,
      links: state => state.App.links,
    }),
  },
}
</script>
<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
<i18n>
{
  "en": {
    "sign in": "Sign in",
    "user": "User",
    "movies": "Movies",
    "sign out": "Log out"
  },
  "fr": {
    "sign in": "S'identifier",
    "user": "Utilisateur",
    "movies": "Films",
    "sign out": "Deconnexion"
  }
}
</i18n>
