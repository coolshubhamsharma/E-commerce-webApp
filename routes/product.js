
const express = require('express');//returns a function
const Product = require('../models/Product')
const router = express.Router();
const Review = require('../models/Review')
const {validateProduct , isLoggedIn , isSeller, isProductAuthor} = require('../middleware');
const User = require('../models/User');
const {productsPage, newProductForm, addTheProduct, showSingleProduct, editProductForm, editTheProduct, deleteProduct} = require('../controllers/product');


//to show all the  products
router.get('/products' , isLoggedIn , productsPage)

//to show the form for new product
router.get('/product/new' ,isLoggedIn , newProductForm)

//to actually add the product
router.post('/products' , validateProduct ,isLoggedIn , isSeller ,  addTheProduct)

//to show a particular product
router.get('/products/:id' ,isLoggedIn , showSingleProduct)

//to show the form to edit a product
router.get('/products/:id/edit' ,isLoggedIn , editProductForm)

//to actually update the edited product in db
router.patch('/products/:id' , validateProduct ,isLoggedIn , editTheProduct)

//to delete a product 
router.delete('/products/:id' , isLoggedIn , isProductAuthor , deleteProduct)


module.exports = router;