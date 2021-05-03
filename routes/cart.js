const express = require('express');
const cart = express.Router();

const cartArray = [
    {id: 1, product: 'Steak', price: 150.00, quantity: 2},
    {id: 2, product: 'Basketball', price: 20.00, quantity: 1},
    {id: 3, product: 'Stuffed Animal', price: 17.99, quantity: 3},
    {id: 4, product: 'Nail Polish', price: 7.19, quantity: 1},
    {id: 5, product: 'Avocados', price: 1.50, quantity: 5}
];

// this is not working find out why later //
cart.get('/', (req, res) => {
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null;
    const prefix = req.query.prefix ? req.query.prefix : null;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
    let myItems = cartArray;
    if (maxPrice) {
        myItems =myItems.filter( item => item.price <= maxPrice);
    } if (prefix) {
        myItems = myItems.filter( item => item.product.toUpperCase().startsWith(prefix.toUpperCase()));
    } if (pageSize) {
        myItems =  myItems.slice(0, pageSize);
    }
    res.status(200);
    res.send(myItems);
});

cart.get('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    const item = cartArray.find( i => i.id === cartId); {
        if(item) {
            res.status(200).send(item);
        } else {
            res.status(404);
            res.send('ID NOT FOUND');
        }
    }
});

cart.post('/', (req, res) => {
    const product = req.body.product;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const id = cartArray[cartArray.length -1].id + 1;
    const newItem = {id, product, price, quantity};
    cartArray.push(newItem);
    res.status(201).json(newItem);
});

cart.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCart = cartArray.findIndex(i => i.id === id);
    cartArray[indexOfCart].product = req.body.product;
    cartArray[indexOfCart].price = req.body.price;
    cartArray[indexOfCart].quantity = req.body.quantity;
    res.status(200).json(cartArray[indexOfCart]);
})

cart.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCart = cartArray.findIndex(i => i.id === id);
    cartArray.splice(indexOfCart, 1);
    res.sendStatus(204);
});

module.exports = cart;