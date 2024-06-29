const express=require('express');
const productmodel = require('../model/product.model');
const route=express.Router();
route.use(express.json());

const {addToCart,getProduct,productEditData,getProductById,productDelete}=require('../controller/product.controller');

route.post('/:userId/:productId',addToCart)
route.get('/',getProduct);
route.get('/:id',productEditData);
route.get('/order/:productId',getProductById);
module.exports=route;