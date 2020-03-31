<template>
  <div>
    <h1>Showing movies</h1>
    <router-link>
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </router-link>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard";
import axios from "axios";
export default {
  components: { MovieCard },
  data() {
    return {
      movies: []
    };
  },
  created() {
    axios
      .get("https://yts.mx/api/v2/list_movies.json")
      .then(response => (this.movies = response.data.data.movies))
      .catch(error => console.log(error));
  }
};
</script>

<style></style>
