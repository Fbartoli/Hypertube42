<template>
  <v-app>
    <v-img src="../src/assets/netflix-image.jpg">
      <v-app-bar app>
        <!-- -->
        <v-toolbar-title>
          <router-link :to="{ name: 'home' }">{{ appName }}</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :to="{ name: 'login' }">{{ $t("sign in") }}</v-btn>
        <v-btn :to="{ name: 'user', params: { username: 'flo' } }">{{
          $t("user")
        }}</v-btn>
        <v-btn :to="{ name: 'movies' }">{{ $t("movies") }}</v-btn>
      </v-app-bar>
      <!-- Sizes your content based upon application components -->
      <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app>
        <select v-model="$root.$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
            lang
          }}</option>
        </select>
      </v-footer>
    </v-img>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {},
  methods: {
    ...mapActions([])
  },
  computed: {
    ...mapState({
      langs: state => state.App.langs,
      appName: state => state.App.appName
    })
  }
};
</script>

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
