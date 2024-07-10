const mongoose=require('mongoose');
const wishlistSchema=mongoose.Schema({
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
        price:Number,
        Status:{
            type:Boolean,
        }
    }]
})
const wishlistModel=mongoose.model("Wishlist",wishlistSchema);
module.exports=wishlistModel;