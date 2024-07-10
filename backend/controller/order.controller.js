const orderModel = require('../model/order.model');
const productmodel=require('../model/product.model');
const cartModel=require('../model/cart.model')
async function enter(req, res) {
    try {
        const { userId, orderId, productName, quantity, totalPrice, status, price } = req.body;
        const order = await orderModel.create({
            userId, orderId, productName, quantity, totalPrice, status, price
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ "message": "Invalid Order" });
    }
}
async function getUserProducts(req, res) {
    try {
        let tprice=0;
        const arr=[];
        const userId = req.params.userId;
        const orders = await orderModel.find({userId});
        console.log(orders);
        orders.forEach(order=>{
            order.items.forEach(orderItem=>{
                const {date,imageUrl,productId,productName,quantity,gender,price,status,id}=orderItem;
                const obj={
                    date,imageUrl,productId,productName,quantity,gender,price,status,id
                }
                arr.push(obj);
            })
            tprice+=order.total;           
        })
        console.log(arr);
        res.json({items:arr,tprice:tprice});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function placeOrder(req,res){
    const userId = req.params.userId;
    console.log(userId)
    try{
        const orders=new orderModel({ userId, items: [] });
        const cartItems=await cartModel.findOne({userId})
        console.log(cartItems.items);
        if(!cartItems || cartItems.items.length==0){
                return res.json({message:"cart is empty"})
        }
        console.log(cartItems)
        var totalPrice=0
            cartItems.items.forEach(item => {
                console.log(item)
                const { imageUrl,productId, productName, quantity,gender, price } = item;
                const now=new Date();
                const formattedDate=now.toLocaleString();
                orders.items.push({
                    date:formattedDate,
                    imageUrl,
                    productId,
                    productName,
                    quantity,
                    gender,
                    price,
                    status: "order placed"
                });
                totalPrice+=price
            });
            orders.total=totalPrice
        await orders.save();
        res.status(200).json({message:"order placed successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json(error);
    }
}
async function directOrder(req, res) {
    const { userId, productId } = req.params;
    const quantity=1;
    console.log(userId);
    console.log(productId);
    
    try {
        const orders = new orderModel({ userId, items: [] });
        const product = await productmodel.findById(productId);
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(product.quantity)
        if(product.quantity===0) 
            return res.status(200).json({message:"Out of stock"});
        else{
            product.quantity=product.quantity-1;
            await product.save();
        }
        const { imageUrl,productName, gender,price } = product;
        const now=new Date();
        const formattedDate=now.toLocaleString();
        orders.items.push({
            date:formattedDate,
            imageUrl,
            productId:product._id,
            productName,
            quantity: quantity || 1,
            gender,
            price,
            status: "order placed"
        });
        orders.total = price * (quantity || 1); 
        await orders.save();
        res.json({ message: "Order placed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error in placing order", error: err.message });
    }
}


module.exports = { enter, getUserProducts, placeOrder,directOrder};