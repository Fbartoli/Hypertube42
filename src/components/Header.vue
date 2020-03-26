<template>
  <div>
    <v-app-bar dense class="navbar">
      <v-btn v-on:click="switchLanguage(getLanguage)" class="Language">{{
        getLanguage
      }}</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapActions(["switchLanguage"])
  },
  computed: {
    ...mapGetters(["getLanguage"])
  }
};
</script>

<style></style>
