const express = require("express");
const app = express();
const cartItems = require("./cartItems.routes");

app.use(express.json());
app.use("/", cartItems);

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}.`);
})