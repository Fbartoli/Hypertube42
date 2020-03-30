<template>
  <v-card>
    <v-card-media src="src" height="200px"> </v-card-media>
    <v-card-title primary-title>
      <div>
        <div class="headline">This is {{ username }}</div>
        <span class="red--text">desription</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat>text</v-btn>
      <v-btn flat color="primary">text</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="show = !show">
        <v-icon>{{
          show ? "keyboard_arrow_down" : "keyboard_arrow_up"
        }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        hidden text
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  props: ["username"]
};
</script>

<style></style>
