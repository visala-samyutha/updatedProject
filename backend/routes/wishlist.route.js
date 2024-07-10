const wishlistmodel = require('../model/wishlist.model');
const express=require('express');
const route=express.Router();
route.use(express.json());
const {addToList,getList, removeFromList, getStatus} = require('../controller/wishlist.controller');
route.get('/:userId',getList)
route.post('/add/:userId/:productId',addToList)
route.delete('/delete/:userId/:productId',removeFromList)
route.get('/status/:userId',getStatus)
module.exports=route