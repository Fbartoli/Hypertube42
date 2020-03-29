<template>
  <v-app>
    <v-app-bar app>
      <!-- -->
      <router-link to="/"> {{ appName }}</router-link>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <HelloI18n />
      </v-container>
    </v-content>

    <v-footer app>
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
          lang
        }}</option>
      </select>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HelloI18n from "./components/HelloI18n";
export default {
  name: "App",

  components: { HelloI18n },
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
