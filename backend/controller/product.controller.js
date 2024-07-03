const productmodel=require('../model/product.model');
const cartModel = require('../model/cart.model');

async function addToCart(req, res) {
    const{userId,productId}=req.params
    const quantity=1
    try {
        const product = await productmodel.findById(productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({ "message": "Product not found" });
        }
        if(product.quantity===0) 
            return res.status(200).json({message:"Out of stock"});
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }
        const cartIndex = cart.items.findIndex(item => item.productId === productId);

        if (cartIndex > -1) {
            cart.items[cartIndex].quantity += quantity;
            cart.items[cartIndex].price = cart.items[cartIndex].quantity*product.price;
            await cart.save();
        } else {
            cart.items.push({
                imageUrl:product.imageUrl,
                productId,
                productName: product.productName,
                quantity,
                price: quantity
            });
        }
        await cart.save();
        // res.status(200).json({ message: 'Product added to cart successfully' });
        res.status(200).json({message:"Product added to cart successfully"})
    } catch (err) {
        // res.status(500).send('An error occurred while adding to the cart');
        res.status(400).json({message:"An error occurred while adding to the cart"})
    }
}
async function postProduct(req,res){
    try{
    const {productId,imageUrl,productName,price,color,type,description,quantity}=req.body;
    const product=await productmodel.create({
        _id:productId,imageUrl,productName,price,color,type,description,quantity
    });
    res.status(200).json(product);
}
catch(error){
    res.status(400).json({"message":"product details invalid"});
}
}
async function productEditData(req,res){
    
    const {id}=req.params;
    const products=await productmodel.findById(id);
    if(!products){
        res.status(300).json("error");
    }
    else{
        
        res.status(200).json(products);
    }
}
async function getProduct(req,res){
    
    const products=await productmodel.find({});
    res.status(200).json(products);
}
async function productEditSave(req,res){
    const {id}=req.params;
    const products=await productmodel.findByIdAndUpdate(id,req.body);
    if(!products){
        res.status(300).json("error");
    }
    else{
        const updatedProduct=await productmodel.findById(id);
        res.status(200).json(updatedProduct);
    }
}

async function productDelete(req,res){
    const {id}=req.params;
    const product=await productmodel.findByIdAndDelete(id);
    res.status(200).json({"message":`product with id ${product} is deleted`})
}
async function getProductById(req,res){
    const productId=req.params.productId;
    const product=await productmodel.findById(productId);
    console.log(product);
    res.status(200).json(product);
}
module.exports={addToCart,postProduct,getProduct,productEditData,productDelete,productEditSave,getProductById};