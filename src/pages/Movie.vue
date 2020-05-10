<template>
  <v-card class="mx-auto my-12" width="80%">
    <v-img max-height="auto" :src="movie.large_cover_image"></v-img>

    <v-card-title>{{ movie.title }} </v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          length="10"
          :value="movie.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">{{ movie.rating }}</div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ movie.year }} • {{ movie.genres[0] }}
      </div>

      <div>
        {{ movie.description_full }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <MovieComment username="storeUsername" token="storeToken" />
  </v-card>
</template>

<script>
import MovieComment from '../components/MovieComment'
import { mapGetters } from 'vuex'

export default {
  components: { MovieComment },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    comments: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      storeToken: 'App/storeToken',
      storeUsername: 'App/storeUsername',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
