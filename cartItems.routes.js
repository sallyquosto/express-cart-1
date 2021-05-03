const express = require("express");
const { filter } = require("methods");
const itemRoutes = express.Router();
const cartItems = require("./cart");

itemRoutes.get('/cart-items', (req, res) => {
    let filteredItems = cartItems;
    const maxPrice = parseFloat(req.query.maxPrice);
    const prefix = req.query.prefix;
    const pageSize = parseInt(req.query.pageSize);
    if (maxPrice) {
        filteredItems = filteredItems.filter(item => item.price <= maxPrice);
    } if (prefix) {
        filteredItems = filteredItems.filter(item => item.product.toLowerCase().startsWith(prefix.toLowerCase()));
    } if (pageSize) {
        filteredItems = filteredItems.slice(0, pageSize)
    }
    res.status(200);
    res.json(filteredItems);
});

itemRoutes.get('/cart-items/:id', (req, res) => {
    const item = cartItems.find(el => el.id == req.params.id);
        if (item) {
            res.status(200);
            res.json(item);
        } else { 
            res.status(404);
            res.send('ID Not Found');
        }
});

itemRoutes.post('/cart-items', (req, res) => {
    const item = req.body;
    item.id = cartItems[cartItems.length - 1].id +1;
    cartItems.push(item);
    res.status(201);
    res.json(item);
});

itemRoutes.put('/cart-items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cartItems.findIndex(item=>item.id===id);

        if(req.body.quantity) cartItems[index].quantity = req.body.quantity;
        if(req.body.product) cartItems[index].product = req.body.product;
        if(req.body.price) cartItems[index].price = req.body.price;
        cartItems[index].id = id;
        res.status(200);
        res.json(cartItems[index]);
    
});

itemRoutes.delete('/cart-items/:id', (req, res) => {
    cartItems.splice(cartItems.findIndex(el => el.id == req.params.id), 1);
    res.status(204);
    res.send();
});

module.exports = itemRoutes;