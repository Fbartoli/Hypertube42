<template>
  <div>
    <h1>Showing movies</h1>
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard";
import { mapState, mapActions } from "vuex";
export default {
  components: { MovieCard },
  computed: {
    ...mapState({
      movies: state => state.Movies.movies
    })
  },
  methods: mapActions("Movies", ["fetchMovies"]),
  created() {
    this.fetchMovies;
  }
};
</script>

<style></style>
