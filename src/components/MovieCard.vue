<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4"></div>
        <v-list-item-title class="headline mb-1">{{
          movie.title
        }}</v-list-item-title>
        <v-list-item-subtitle>{{
          movie.description_full
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"
        ><v-img :src="movie.medium_cover_image"></v-img
      ></v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    movie: Object
  }
};
</script>

<style lang="scss" scoped></style>
