const mongoose=require('mongoose');
const orderModel = require('./order.model');
const cartModel = require('./cart.model');
const user_schema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    username:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    active:{
        type:Boolean,
       
    },
    role:{
        type:String,
        default:"user",
    },
    // cart:{
        
    //         type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Cart',
    
    //     required:true,
    // },
    // ordersList:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order',
    // }
    
});

const userModel=mongoose.model("User",user_schema);
module.exports=userModel;