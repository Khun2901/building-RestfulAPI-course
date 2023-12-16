// Import the axios library
const axios = require('axios')
let moviesList = null

const getServerData = async function () {
  if(moviesList === null){
    moviesList = (await axios.get('http://localhost:3000/movies')).data
  }
}

const getMovies = async (done) => {
  // get all movies
  await getServerData()
  return done(null, JSON.stringify(moviesList))
}

const getMoviesById = async (movieId, done) => {
  // get movie by id
  await getServerData()
  const movie = moviesList.find(t => t.id === parseInt(movieId))
  if(!movie) {
    return done("Requested product doesn\'t exist..!", null)
  }
  else{
    return done(null, JSON.stringify(movie))
  }
}

const saveMovie = async (newMovie, done) => {
  // save the details of a movie read from the request body
  await getServerData()
  const newMovieId = newMovie.id
  const isMovieExist = moviesList.find(t => t.id === parseInt(newMovieId))
  if(!isMovieExist) {
    moviesList.push(newMovie)
    return done(null, JSON.stringify(newMovie));
  }
  else {
    return done("Movie already exists..!", null)
  }
}

const updateMovie = async (movieId, updateData, done) => {
  // update movie details of a specific movie
  await getServerData()
  const movie = moviesList.find(t => t.id === parseInt(movieId))
  if(movie) {
    const index = moviesList.indexOf(movie)
    moviesList[index].movieName = updateData.movieName
    moviesList[index].director = updateData.director
    moviesList[index].rating = updateData.rating
    done(null, JSON.stringify(moviesList[index]))
  }
  else {
    done("Requested movie doesn\'t exist..!", null)
  }
}

const deleteMovieById = async (movieId, done) => {
  // delete a specific movie 
  await getServerData()
  const movie = moviesList.find(t => t.id === parseInt(movieId))
  if(movie) {
    const index = moviesList.indexOf(movie)
    moviesList.splice(index, 1)
    done(null, "Deleted the specified movie id")
  }
  else {
    done("Requested movie doesn\'t exist..!", null)
  }
  
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
