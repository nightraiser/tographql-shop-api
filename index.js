const express = require('express');
const mongoose = require('mongoose');
const productService = require('./services/product.service');
const cartService = require('./services/cart.service');

import Server from './apolloServer';

const connectionString = 'mongodb://demoUser:demoPassword@172.16.51.23/demo';
mongoose.connect(connectionString);
const db = mongoose.connection;
const app = express();
app.use(express.json());      
app.use(express.urlencoded()); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const port = 4200;
db.on('error', (error) => console.log(error));

// PRODUCT ROUTE
app.get('/products', async (req, res) => {
    console.log(req.headers);
    const data = await productService.findAllAsync({}, req.headers['user-agent']);
    res.json(data);
});

app.post('/product', async (req, res) => {
    const { title, description, image, price, inventory, availableVariants, averageRating} = req.body;
    const data = await productService.createProduct({title, description, image, price, inventory, availableVariants, averageRating});
    res.json(data);
})

app.get('/products/:title', async (req, res) => {
    
    const data = await productService.findAllAsync({title: req.params.title}, req.headers['user-agent']);
    res.json(data);
});
app.get('/product/:id', async (req, res) => {
    const data = await productService.findOne(req.params.id, req.headers['user-agent']);
    res.json(data);
});

// CART ROUTE

app.get('/mycart', async (req, res) => {
    const data = await cartService.findByUser(req.headers['user-agent']);
    res.json(data);
});

app.post('/mycart', async (req, res) => {
    const { item, quantity = 1 } = req.body;
    const user = req.headers['user-agent'];
    const data = await cartService.addToCart({item, quantity, user});
    res.json(data);
});

app.post('/removeCart', async (req, res) => {
    const { cId } = req.body;
    const data = await cartService.removeFromCart(cId);
    res.json(data);
});


Server.applyMiddleware({app});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))