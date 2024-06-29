require('dotenv').config()
const express=require('express');
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
const userRoutes=require('./routes/signup.route')
const productRoutes=require('./routes/product.route');
const adminRoutes1=require('./routes/admin.route');
const cartRoutes=require('./routes/cart.route');
const orderRoutes=require('./routes/order.route');

const port=process.env.PORT;
const mongoose=require('mongoose');
//mongoose.connect('mongodb+srv://ecommerce:jpmc123@test.sjcndqs.mongodb.net/')
mongoose.connect('mongodb://127.0.0.1:27017/Project')
.then(()=>console.log("connection successful"));
app.use('/signup',userRoutes);
app.use('/home',productRoutes);
app.use('/admin',adminRoutes1);
app.use('/cart',cartRoutes)
app.use('/order',orderRoutes)

app.listen(port);