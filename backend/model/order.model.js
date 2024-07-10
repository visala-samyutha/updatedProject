const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    orderId:{
        type:String,
    },
  userId: { type:mongoose.Schema.Types.ObjectId, required: true },
  items: [{
        date:Date,
        imageUrl:String,
        productId:{
            type:String,
            required:true,
            },
        productName: String,
        quantity: {
                type:Number,
                default:1,
            },
            gender:String,
        price: Number,
        status: { type: String, default: 'Processing' },
    }],
    total: { type: Number, 
        //required: true }
    }
});
const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;