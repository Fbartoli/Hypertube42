<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <br /><br />
    <v-row>
      <v-col cols="1" />
      <v-col cols="4">
        <v-row>
          <v-select
            v-model.lazy="orderSelected"
            :items="orderByList"
            :label="$t('orderby')"
            @change="updateMoviesList"
            outlined
          />
        </v-row>
      </v-col>
      <v-col cols="2" />
      <v-col cols="4">
        <v-row>
          <v-select
            v-model.lazy="filterSelected"
            :items="filterByList"
            :label="$t('filterby')"
            @change="updateMoviesList"
            outlined
          />
        </v-row>
      </v-col>
      <v-col cols="1" />
    </v-row>
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
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard'
import store from '../store'
import { mapState, mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

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
      filterSelected: '',
      filterByList: ['', 'date_added', 'download_count', 'title', 'rating'],
      orderSelected: '',
      orderByList: ['', 'desc', 'asc'],
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
    ...mapState(['Movies']),
    // ...mapActions('Movies', ['addMovies', 'filteredFetchMovies', 'filteredAddMovies']),
    ...mapGetters({
      storeMovies: 'Movies/storeMovies',
    }),
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
      if (this.filterSelected !== '' || this.orderSelected !== '') {
        store.dispatch('Movies/filteredAddMovies', {
          page: this.page,
          filter: this.filterSelected,
          order: this.orderSelected,
        })
      } else {
        store.dispatch('Movies/addMovies', this.page)
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    updateMoviesList() {
      store.dispatch('Movies/filteredFetchMovies', {
        page: this.page,
        filter: this.filterSelected,
        order: this.orderSelected,
      })
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        console.log('--- infinite scrolling ! ---')
        // console.log(this.addMovies())
        this.addMovies()
      }
    },
  },
}
</script>

<style></style>

<i18n>
{
  "en": {
    "title": "Movies",
    "orderby": "Order by",
    "filterby": "Filter"
  },
  "fr": {
    "title": "Films",
    "orderby": "Trier",
    "filterby": "Filtrer"
  }
}
</i18n>
