// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT =  process.env.PORT || 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if(req.url === '/api/v1/movies' && req.method === 'GET') {
    moviesService.getMovies((error, result) => {
      res.writeHead(200, {
        'content-type': 'application/json'
      })
      res.end(result)
    })
  }
  // Get a movie with specified id
  else if(req.url.match(/\/api\/v1\/movies\/([0-9])/) && req.method === 'GET') {
    const movieId = parseInt(req.url.split("/")[4])
    moviesService.getMoviesById(movieId, (error, result) => {
      if(!error) {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(result)
      }
      else {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
  }
  // Save movie details
  else if(req.url === '/api/v1/movies' && req.method === 'POST') {
    const newMovie = await getRequestData(req)
    moviesService.saveMovie(JSON.parse(newMovie), (error, result) => {
      if(!error) {
        res.writeHead(201, {
          'content-type': 'application/json'
        })
        res.end(result)
      }
      else {
        res.writeHead(400, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
  }
  // Update a specific movie
  else if(req.url.match(/\/api\/v1\/movies\/[(0-9)]/) && req.method === 'PUT'){
    const movieId = parseInt(req.url.split("/")[4])
    const updateData = await getRequestData(req)
    moviesService.updateMovie(movieId, JSON.parse(updateData), (error, result) => {
      if(!error) {
        res.writeHead(201, {
          'content-type': 'application/json'
        })
        res.end(result)
      }
      else {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
    
    
  }
  // Delete a specific movie
  else if(req.url.match(/\/api\/v1\/movies\/[(0-9)]/) && req.method === 'DELETE') {
    const movieId = parseInt(req.url.split("/")[4])
    moviesService.deleteMovieById(movieId, (error, result) => {
      if(!error) {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(result)
      }
      else {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
  }
  // If no route present capture in the else part
  else {
    res.writeHead(400, {
      'content-type': 'application/json'
    })
    res.end("Invalid route")
  }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
