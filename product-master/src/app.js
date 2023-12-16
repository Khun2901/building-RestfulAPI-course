//Import the necessary dependencies
const http = require('http')
// Define a port at which the server will run
const PORT = process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  if(req.url === '/api/v1/products' && req.method === 'GET') {
    res.writeHead(200, {
      'content-type': 'application/json'
    })
    res.end(productsService.getProducts())
  }

  // Get a product with specified id
  else if (req.url.match(/\/api\/v1\/products\/([0-9])/) && req.method === 'GET') {
    const productId = parseInt(req.url.split("/")[4])
    productsService.getProductsById(productId, (error, result) => {
      if (!error) {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(result)
      } else {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    });
  }

  // Create a new product
  else if (req.url === '/api/v1/products' && req.method === 'POST'){
    const reqData = await getRequestData(req)
    productsService.saveProduct(JSON.parse(reqData), (error, result) => {
      if(!error) {
        res.writeHead(201, {
          'content-type': 'application/json'
        })
        res.end(JSON.stringify(JSON.parse(reqData)))
      }
      else {
        res.writeHead(400, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
  }

  // Update a specific product
  else if (req.url.match(/\/api\/v1\/products\/([0-9])/) && req.method === 'PUT'){
    const reqData = await getRequestData(req)
    const productId = parseInt(req.url.split("/")[4])
    productsService.updateProduct(productId, JSON.parse(reqData), (error, result) => {
      if(!error){
        res.writeHead(201, {
          'content-type': 'application/json'
        })
        res.end(JSON.stringify(JSON.parse(result).find(t => t.id === productId)))
      }
      else {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
  }
  // Delete a specific Product
  else if (req.url.match(/\/api\/v1\/products\/([0-9])/) && req.method === 'DELETE'){
    const productId = parseInt(req.url.split("/")[4])
    productsService.deleteProduct(productId, (error, result) => {
      if(!error) {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end("Deleted Specified Product")
      }
      else {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end(error)
      }
    })
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})