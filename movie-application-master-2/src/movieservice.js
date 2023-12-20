//import axios module
const axios = require('axios')
const fs = require('fs')
//After starting the JSON server check the port on which is running accordingly change 
//the port in url given below

//This method will get all movies from json server
const getMovies = (done) => {
  // This url can be used - axios.get("http://localhost:3000/movies")
  axios.get("http://localhost:3000/movies")
    .then(response => {
      return(done(null, response.data))
    })
    .catch((error) => {
      return done("Encountered error while reading the data from the server")
    })
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
  axios.get(`http://localhost:3000/movies/${movieId}`)
    .then(res => {
      return done(null, res.data)
    })
    .catch((error) => {
      return done("Encountered error while reading the data from the server")
    })
 
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
  axios.post(`http://localhost:3000/movies`, movieDetails)
    .then(res => {
      return done(null, res.data)
    })
    .catch((error) => {
      return done("Encountered error while saving new data to the server")
    })
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
  axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
    .then(res => {
      return done(null, "Successfully patch movie details of the specified id");
    })
    .catch((error) => {
      return done("Encountered error while patching the data")
    })
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
  axios.delete(`http://localhost:3000/movies/${movieId}`)
    .then(res => {
      return done(null, "Successfully deleted the specified movie id")
    })
    .catch((error) => {
      return done("Encountered error while deleting the data")
    })
 
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
