const mongoose=require('mongoose');
const userModel = require('./signup.model');
const cartSchema=mongoose.Schema({
    cartItemId:{
        type:String,
        //required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    items:[{
        imageUrl:String,
        productId:{
        type:String,
        required:true,
        },
        productName:String,
        quantity:{
            type:Number,
            default:1,
        },
        gender:String,
        price:Number
    }]
});
const cartModel=mongoose.model("Cart",cartSchema);
module.exports=cartModel;