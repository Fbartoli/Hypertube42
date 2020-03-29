<template>
  <v-app>
    <v-app-bar app>
      <!-- -->
      <v-btn app v-on:click="toggleDrawer"></v-btn>
      <router-link to="/"> {{ appName }}</router-link>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app> <!-- --> </v-footer>
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
    ...mapState(["appName"])
  }
};
</script>
