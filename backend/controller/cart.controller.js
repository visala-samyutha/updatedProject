// const cartModel = require('../model/cart.model');
// const productModel = require('../model/product.model');


// async function showCart(req, res) {
//         const  userId  = req.params.id;
//         try {
//             console.log(userId)
//             const cart = await cartModel.findOne({userId});
//             if (!cart || cart.items.length === 0) {
//                 return res.status(200).json({ 'message': 'cart is empty' });
//             }
//             let tprice=0;
//             cart.items.forEach(cartItem=>{
//                 tprice+=cartItem.price
//             })
//             res.status(200).json({items:cart.items,tprice:tprice});
//             // res.status(200).json(cart.items)
//         } catch (err) {
//             res.status(500).send('An error occurred while displaying the cart');
//         }
//     }
// async function deleteCartItem(req,res){
//    const {userId,productId}=req.params
//    console.log(userId)
//    console.log(productId)
//    try {
//         const cart = await cartModel.findOne( {userId} );
//         console.log(cart)
//         if (!cart) {
//             return res.status(200).json({ 'message': 'cart does not exist' });
//         }
//         if (!cart || cart.items.length === 0) {
//             return res.status(200).json({ 'message': []});
//         }   
//         const cartIndex = cart.items.findIndex(item => item.productId === productId); 
//         console.log(cartIndex)
//         cart.items.splice(cartIndex,1);
//        await cart.save();
//         res.status(200).json({ 'message': 'product deleted from cart successfully' });
//         } catch (err) {
//         //  res.status(500).send('An error occurred while clearing the cart');
//         res.status(500).send(err)
//         }
// }
// async function incrementCart(req,res){
//     const {userId,productId}=req.params
//     try{
//         const cart = await cartModel.findOne( {userId} );
//         const cartIndex = cart.items.findIndex(item => item.productId === productId);
//         // console.log(cartIndex)
//         // console.log(productId)
//         const product=await productModel.findById(productId)
//         // console.log(product)
//         if(cart.items[cartIndex].quantity+1>product.quantity){
//             return res.json({message:"product out of stock"})
//         }
//         cart.items[cartIndex].quantity+=1
//         cart.items[cartIndex].price=cart.items[cartIndex].quantity*product.price
//         await cart.save();
//         res.json({message:"cart items incremented"})
//     }
//     catch(err){
//         res.json({message:"error occured"})
//     }
// }
// async function decrementCart(req,res){
//     const {userId,productId}=req.params
//     try{
//         const cart = await cartModel.findOne( {userId} );
//         const cartIndex = cart.items.findIndex(item => item.productId === productId);
//         console.log(cartIndex)
//         console.log(productId)
//         const product=await productModel.findById(productId)
//         console.log(product)
//         if(cart.items[cartIndex].quantity-1===0){
//             cart.items.splice(cartIndex,1)
//             cart.save()
//            return res.json({message:"cart item deleted"})
//         }
//         cart.items[cartIndex].quantity-=1
//         cart.items[cartIndex].price=cart.items[cartIndex].quantity*product.price
//         await cart.save();
//         res.json({message:"cart items decremented"})
//     }
//     catch(err){
//         res.json({message:"error occured"})
//     }
// }



// module.exports = { showCart, deleteCartItem ,incrementCart,decrementCart};
// const productmodel=require('../model/product.model');
// const cartModel = require('../model/cart.model');

// async function addToCart(req, res) {
//     const{userId,productId}=req.params
//     const quantity=1
//     try {
//         const product = await productmodel.findById(productId);
//         console.log(product);
//         if (!product) {
//             return res.status(404).json({ "message": "Product not found" });
//         }
//         if(product.quantity===0) 
//             return res.status(200).json({message:"Out of stock"});
//         let cart = await cartModel.findOne({ userId });
//         if (!cart) {
//             cart = new cartModel({ userId, items: [] });
//         }
//         const cartIndex = cart.items.findIndex(item => item.productId === productId);

//         if (cartIndex > -1) {
//             cart.items[cartIndex].quantity += quantity;
//             cart.items[cartIndex].price = cart.items[cartIndex].quantity*product.price;
//             await cart.save();
//         } else {
//             cart.items.push({
//                 imageUrl:product.imageUrl,
//                 productId,
//                 productName: product.productName,
//                 quantity,
//                 gender:product.gender,
//                 price:product.price
//             });
//         }
//         await cart.save();
//         // res.status(200).json({ message: 'Product added to cart successfully' });
//         res.status(200).json({message:"Product added to cart successfully"})
//     } catch (err) {
//         // res.status(500).send('An error occurred while adding to the cart');
//         console.log(err)
//         res.status(400).json({message:"An error occurred while adding to the cart"})
//     }
// }
// async function postProduct(req,res){
//     try{
//     const {productId,imageUrl,productName,price,color,gender,type,description,quantity}=req.body;
//     const product=await productmodel.create({
//         _id:productId,imageUrl,productName,price,color,gender,type,description,quantity
//     });
//     res.status(200).json(product);
// }
// catch(error){
//     res.status(400).json({"message":"product details invalid"});
// }
// }
// async function productEditData(req,res){
    
//     const {id}=req.params;
//     const products=await productmodel.findById(id);
//     if(!products){
//         res.status(300).json("error");
//     }
//     else{
        
//         res.status(200).json(products);
//     }
// }
// async function getProduct(req,res){
    
//     const products=await productmodel.find({});
//     res.status(200).json(products);
// }
// async function productEditSave(req,res){
//     const {id}=req.params;
//     const products=await productmodel.findByIdAndUpdate(id,req.body);
//     if(!products){
//         res.status(300).json("error");
//     }
//     else{
//         const updatedProduct=await productmodel.findById(id);
//         res.status(200).json(updatedProduct);
//     }
// }

// async function productDelete(req,res){
//     const {id}=req.params;
//     const product=await productmodel.findByIdAndDelete(id);
//     res.status(200).json({"message":`product with id ${product} is deleted`})
// }
// async function getProductById(req,res){
//     const productId=req.params.productId;
//     const product=await productmodel.findById(productId);
//     console.log(product);
//     res.status(200).json(product);
// }
// module.exports={addToCart,postProduct,getProduct,productEditData,productDelete,productEditSave,getProductById};
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