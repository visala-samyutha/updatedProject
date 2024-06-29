const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    productId:{
        type: String 
    },   
    imageUrl:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    color:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    description:String,
    quantity:{
        type:Number,
        default:1  
    }
});
const productModel=mongoose.model("Product",productSchema);
module.exports=productModel;