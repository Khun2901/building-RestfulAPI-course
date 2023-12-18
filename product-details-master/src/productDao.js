//import fs module
const fs = require('fs')

//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function(done){
  fs.readFile('src/products.json', (err, fileContent) => {
    if(err) {
      return done("Encountered error while getting the data")
    }
    let productData = JSON.parse(fileContent)
    return done(undefined, productData)
  })
    

//parse the filecontent and save it in another varible say productdata
//return the callback with first parameter as undefined and second parameter as productdata
       
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id,done){
  //write all the logical steps
  fs.readFile("src/products.json", (err, fileContent) => {
    if(err) {
      return done("Encountered error while getting the data")
    }
    const products = JSON.parse(fileContent)
    const productData = products.find(p => p.id === id)
    if(productData === undefined) {
      return done("No products found with the specified id")
    }
    return done(undefined, productData)
  })
  //return the callback with first parameter as undefined and second parameter as productDetails
      
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData
  fs.readFile("src/products.json", (err, fileContent) => {
    if(err) {
      return done("Encountered error while reading data")
    }
    let productData = JSON.parse(fileContent)
    let maxId = 0
    for(const data of productData) {
      if(data.id > maxId) {
        maxId = data.id
      }
    }
    ProductDetails.id = maxId + 1
    productData.push(ProductDetails)
    fs.writeFile("src/products.json", JSON.stringify(productData), (error, newContent) => {
      if(error) {
        return done("Encountered error while creating new data")
      }
      return done(undefined, ProductDetails)
    })
  })
  //Write the productData into the file 
     
  //return the callback with undefined and ProductDetails
     
    
  }

  //The method deleteProductById will take productId and done as parameters
  //It will read the product.json file

  const deleteProductById = function(productId, done){
    //Write all the logical steps
     //return the callback with first parameter as undefined and second parameter as productDetails
     fs.readFile("src/products.json", (err, fileContent) => {
      if(err) {
        return("Encountered error while reading the data file")
      }
      let productData = JSON.parse(fileContent)
      const index = productData.findIndex(p => p.id === productId)
      if(index == -1) {
        return done("Product not found")
      }
      productData.splice(index, 1)
      fs.writeFile("src/products.json", JSON.stringify(productData), (err, updatedData) => {
        if(err) {
          return done("Encountered error while writing the file")
        }
        return done(undefined, "Successfully deleted the specified data")
      })
     })
  }


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
    
}