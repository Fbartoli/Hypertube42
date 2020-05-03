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
        :to="{
          name: 'movies',
          params: { page: 1 },
        }"
        >{{ $t('movies') }}</v-btn
      >
      <v-btn
        class="mx-5"
        color="primary"
        v-show="userInfo.auth === true"
        :label="$t('user')"
        :to="{
          name: 'user',
          params: { username: userInfo.username || 'none' },
        }"
        >{{ $t('user') }}</v-btn
      >
      <v-btn
        @click="resetState"
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
      <v-avatar>
        <img
          v-if="userApp.avatar"
          :src="`data:image/*;base64,${userApp.avatar}`"
        />
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
import { mapActions, mapGetters } from 'vuex'
import NotificationContainer from './components/NotificationContainer'

export default {
  name: 'App',
  components: { NotificationContainer },
  data: () => ({
    searchUsername: '',
  }),
  methods: {
    ...mapActions('App', ['resetState']),
  },
  computed: {
    // ...mapState({
    //   langs: state => state.App.langs,
    //   appName: state => state.App.appName,
    //   links: state => state.App.links,
    // }),
    ...mapGetters({
      userApp: 'App/storeUser',
      langs: 'App/storeLangs',
      appName: 'App/storeAppName',
      // currentUsername: 'App/storeUsername',
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
    "home": "Home",
    "sign in": "Login",
    "user": "Settings",
    "register": "Register",
    "movies": "Movies",
    "sign out": "Log out",
    "search_box_label": "Check a profile"
  },
  "fr": {
    "home": "Accueil",
    "sign in": "Connexion",
    "user": "Paramètres",
    "register": "S'inscrire",
    "movies": "Films",
    "sign out": "Déconnexion",
    "search_box_label": "Consulter un profil"
  }
}
</i18n>
