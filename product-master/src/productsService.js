// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList)
}

const getProductsById = (productId, done) => {
  let product = null
  // get a product by ID
  product = productsList.find(t => t.id === parseInt(productId))
  if(product) {
    return done(null, JSON.stringify(product));
  }
  else {
    return done("Requested product doesn\'t exist..!", null)
  }
}

const saveProduct = (newProduct, done) => {
  // save a product
  let products = productsList
  const newProductId = newProduct.id
  isProductExist = productsList.find(t => t.id === parseInt(newProductId))
  if(isProductExist){
    return done("Product already exists..!", null);
  }
  else {
    products.push(newProduct)
    return done(null, JSON.stringify(products));
  }
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;

  // update the product list
  let product = productsList.find(t => t.id === parseInt(productId))
  if(product){
    updatedProductList = productsList
    const index = updatedProductList.indexOf(product)
    updatedProductList[index].name = updateData.name
    updatedProductList[index].description = updateData.description
    updatedProductList[index].price = updateData.price
    updatedProductList[index].quantity = updateData.quantity
    done(null, JSON.stringify(updatedProductList));
  }
  else {
    done("Requested product doesn't exist..!", null);
  }
}

const deleteProduct = (productId, done) => {
  // delete a product
  let product = productsList.find(t => t.id === parseInt(productId))
  if(product){
    let deletedProductList = productsList
    const index = deletedProductList.indexOf(product)
    deletedProductList.splice(index, 1)
    done(null, JSON.stringify(productsList));
  }
  else {
    done("Requested product doesn't exist..!", null);
  }

}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}