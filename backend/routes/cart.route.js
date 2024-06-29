const express = require('express');
const routes = express.Router();
// const cartModel=require("../model/cart.model");
const { showCart, deleteCartItem,incrementCart ,decrementCart} = require('../controller/cart.controller');
routes.get('/:id',showCart)
routes.post('/delete/:userId/:productId',deleteCartItem)
routes.post('/incCart/:userId/:productId',incrementCart)
routes.post('/decCart/:userId/:productId',decrementCart)
module.exports=routes