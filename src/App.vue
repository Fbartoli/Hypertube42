<template>
  <v-app>
    <v-app-bar hide-on-scroll flat color="transparent" app>
      <!-- -->
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">{{ appName }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-btn :to="{ name: 'login' }">{{ $t("sign in") }}</v-btn> -->
      <v-btn
        v-for="link in links"
        :key="`${link.linkname}-header`"
        text
        :to="{ name: link.linkname, params: link.params }"
        >{{ $t(link.label) }}</v-btn
      >
      <v-btn v-show="!userInfo.auth" text :to="{ name: 'login' }"
        >{{ $t('sign in') }}
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue -router -->
        <router-view :key="$route.fullPath"></router-view>
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
    "sign in": "sign in",
    "user": "user",
    "movies": "movies"
  },
  "fr": {
    "sign in": "s'identifier",
    "user": "Utilisateur",
    "movies": "films"
  }
}
</i18n>
