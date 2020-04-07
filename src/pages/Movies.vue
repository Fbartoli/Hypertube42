<template>
  <div>
    <h1>Showing movies</h1>
    <v-row dense>
      <v-col v-for="movie in Movies.movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
    <template v-if="page != 1">
      <router-link :to="{ name: 'movies', query: { page: page - 1 } }"
        >Previous Page</router-link
      >
      <template v-if="hasNextPage">|</template>
    </template>

    <router-link
      v-if="hasNextPage"
      :to="{ name: 'movies', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard";
import store from "../store";
import { mapState } from "vuex";

function getPageMovies(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("Movies/fetchMovies", currentPage)
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    })
    .catch(error => {
      if (error.response && error.response.status == 404) {
        next({ name: "404", params: { resource: "movie" } });
      }
      next({ name: "network-issue" });
    });
}

export default {
  components: { MovieCard },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageMovies(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageMovies(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.Movies.movieTotal > this.page * this.Movies.perPage;
    },
    ...mapState(["Movies"])
  }
};
</script>

<style></style>
