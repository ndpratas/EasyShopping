const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080
const fs = require('fs');
const shoppingcartDB = "shoppingcart-db.json"


app.get('/shoppingcart/:user_id', (req, res) => {
    const shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    var found;
    shoppingCart.forEach(element => {
        if (element.user_id == req.params.user_id) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(element));
            found = 1;
        };
     });
     if (!found) {
        res.status(404).send("Not found");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/shoppingcart', (req, res) => {
    const products = req.body;
    var shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    shoppingCart = addItemsToShoppingCart(shoppingCart, products);
    fs.writeFileSync(shoppingcartDB, JSON.stringify(shoppingCart) , 'utf8');
    res.send("Saved!");
});


app.delete('/shoppingcart', (req, res) => {
    const products = req.body;
    var shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    shoppingCart = removeItemsFromShoppingCart(shoppingCart, products);
    fs.writeFileSync(shoppingcartDB, JSON.stringify(shoppingCart) , 'utf8');
    res.send("Removed!");
});

app.listen(port, () => {
    console.log('We are live on ' + port);
}); 

function addItemsToShoppingCart(shoppingCart, products) {
    var found;
    shoppingCart.forEach(element => {
       if (element.user_id == products.user_id) {
            element.products = element.products.concat(products.products.filter(i => !element.products.includes(i)));
            found = 1;
       };
    });
    if (!found) {
        shoppingCart.push(products);
    }
    return shoppingCart;
}

function removeItemsFromShoppingCart(shoppingCart, products) {
    var found;
    shoppingCart.forEach(element => {
       if (element.user_id == products.user_id) {
            element.products = element.products.filter(i => !products.products.includes(i));
            found = 1;
       };
    });
    return shoppingCart;
}

