const express = require('express');
const cart = require('./routes/cart');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/cart', cart);

app.listen(port, () => console.log('listening on port 3000'));