<template>
  <div>
    <h1>Showing movies</h1>
    <v-row dense>
      <v-col v-for="movie in Movies.movies" :key="movie.id">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <MovieCard :movie="movie" />
        </v-lazy>
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
import MovieCard from '../components/MovieCard'
import store from '../store'
import { mapState } from 'vuex'

function getPageMovies(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('Movies/fetchMovies', currentPage)
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
    .catch(error => {
      if (error.response.status === 404) {
        next({ name: '404', params: { resource: 'movie' } })
      }
      next({ name: 'network-issue' })
    })
}

export default {
  components: { MovieCard },
  data() {
    return {
      isActive: false,
      bottom: false,
    }
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageMovies(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageMovies(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.Movies.movieTotal > this.page * this.Movies.perPage
    },
    ...mapState(['Movies']),
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    addMovies() {
      console.log('loading')
      this.page += 1
      console.log()
      store.dispatch('Movies/addMovies', this.page)
    },
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        console.log('test')
        this.addMovies()
      }
    },
  },
}
</script>

<style></style>
