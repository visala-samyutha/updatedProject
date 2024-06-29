const cartModel = require('../model/cart.model');
const productModel = require('../model/product.model');


async function showCart(req, res) {
        const  userId  = req.params.id;
        try {
            console.log(userId)
            const cart = await cartModel.findOne({userId});
            if (!cart || cart.items.length === 0) {
                return res.status(200).json({ 'message': 'cart is empty' });
            }
            let tprice=0;
            cart.items.forEach(cartItem=>{
                tprice+=cartItem.price
            })
            res.status(200).json({items:cart.items,tprice:tprice});
            // res.status(200).json(cart.items)
        } catch (err) {
            res.status(500).send('An error occurred while displaying the cart');
        }
    }
async function deleteCartItem(req,res){
   const {userId,productId}=req.params
   console.log(userId)
   console.log(productId)
   try {
        const cart = await cartModel.findOne( {userId} );
        console.log(cart)
        if (!cart) {
            return res.status(200).json({ 'message': 'cart does not exist' });
        }
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ 'message': []});
        }   
        const cartIndex = cart.items.findIndex(item => item.productId === productId); 
        console.log(cartIndex)
        cart.items.splice(cartIndex,1);
       await cart.save();
        res.status(200).json({ 'message': 'product deleted from cart successfully' });
        } catch (err) {
        //  res.status(500).send('An error occurred while clearing the cart');
        res.status(500).send(err)
        }
}
async function incrementCart(req,res){
    const {userId,productId}=req.params
    try{
        const cart = await cartModel.findOne( {userId} );
        const cartIndex = cart.items.findIndex(item => item.productId === productId);
        // console.log(cartIndex)
        // console.log(productId)
        const product=await productModel.findById(productId)
        // console.log(product)
        if(cart.items[cartIndex].quantity+1>product.quantity){
            return res.json({message:"product out of stock"})
        }
        cart.items[cartIndex].quantity+=1
        cart.items[cartIndex].price=cart.items[cartIndex].quantity*product.price
        await cart.save();
        res.json({message:"cart items incremented"})
    }
    catch(err){
        res.json({message:"error occured"})
    }
}
async function decrementCart(req,res){
    const {userId,productId}=req.params
    try{
        const cart = await cartModel.findOne( {userId} );
        const cartIndex = cart.items.findIndex(item => item.productId === productId);
        console.log(cartIndex)
        console.log(productId)
        const product=await productModel.findById(productId)
        console.log(product)
        if(cart.items[cartIndex].quantity-1===0){
            cart.items.splice(cartIndex,1)
            cart.save()
           return res.json({message:"cart item deleted"})
        }
        cart.items[cartIndex].quantity-=1
        cart.items[cartIndex].price=cart.items[cartIndex].quantity*product.price
        await cart.save();
        res.json({message:"cart items decremented"})
    }
    catch(err){
        res.json({message:"error occured"})
    }
}



module.exports = { showCart, deleteCartItem ,incrementCart,decrementCart};