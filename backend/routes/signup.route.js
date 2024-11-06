const express=require('express');
const jwt=require('jsonwebtoken');
const signModel=require('../model/signup.model');
const {saveUser,checkUser,updatePassword, getUserData, updateUserProfile, deleteAcc}=require('../controller/signup.controller')


const productModel=require('../model/product.model');
const cartModel=require('../model/cart.model');
const orderModel=require('../model/order.model');
const routes=express.Router();
routes.use(express.json());
routes.post('/',saveUser);
routes.post('/login',checkUser);
routes.put('/update',updatePassword);
routes.get('/user/:id',getUserData);
routes.put('/user/:id',updateUserProfile)
routes.delete('/user/:id',deleteAcc);



module.exports=routes;