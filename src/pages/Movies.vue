<template>
  <div>
    <h1>Showing movies</h1>
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard";
export default {
  components: { MovieCard },
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
