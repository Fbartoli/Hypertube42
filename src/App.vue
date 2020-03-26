<template>
  <div>
    <div>
      <Header />
      <router-view />
    </div>
    {{ getMessageServer }}
    <v-btn v-on:click="updateMessageServer">Click</v-btn>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: { Header },
  methods: {
    ...mapActions(["updateMessageServer"])
  },
  computed: {
    ...mapGetters(["getMessageServer"])
  }
};
</script>
