const imdb = require('./services/ImdbService')

async function getData() {
  console.log(await imdb.getMovies(1))
}

getData()
