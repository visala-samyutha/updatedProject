const productmodel=require('../model/product.model');
const wishlistModel=require('../model/wishlist.model');

async function addToList(req,res){
    const userId=req.params.userId
    const productId=req.params.productId;
    console.log(productId)
    const quantity=1
    try{
        const product = await productmodel.findById(productId);
        console.log(product)
        let list = await wishlistModel.findOne({ userId });
        if(!list){
            list = new wishlistModel({ userId, items: [] });
        }
        list.items.push({
            imageUrl:product.imageUrl,
            productId,
            productName: product.productName,
            quantity,
            price:product.price,
            Status:true
        });
        await list.save();
        res.status(200).json({message:"Product added to wishlist successfully"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"An error occurred while adding to the list"})
    }
}
async function removeFromList(req,res){
    const userId=req.params.userId
    const productId=req.params.productId
    try{
        const product = await productmodel.findById(productId);
        console.log(product)
        let list = await wishlistModel.findOne({ userId });
        const index=list.items.findIndex(item => item.productId === productId);
        list.items.splice(index, 1);
        await list.save();
        res.status(200).json({message:"Product removed from wishlist successfully"})       
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"An error occurred while removing from the list"})
    }
}
async function getList(req,res){
    const userId=req.params.userId
    try{
        const list = await wishlistModel.findOne({ userId });
        res.status(200).json(list.items)
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"An error occurred while fetching the list"})
    }
}
async function getStatus(req,res){
    const userId=req.params.userId;
    try{ 
        const list = await wishlistModel.findOne({ userId });
        const listItems=list.items
        const statuses = {};
        listItems.map(listItem=>{
            statuses[listItem.productId] = true;
        })     
        res.status(200).json(statuses)
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"An error occurred while fetching the status"})
    }
}
module.exports = {addToList,removeFromList,getList,getStatus};