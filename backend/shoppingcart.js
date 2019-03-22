const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080
const fs = require('fs');
const shoppingcartDB = "shoppingcart-db.json"


app.get('/shoppingcart/:id', (req, res) => {
    const shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    var found;
    shoppingCart.forEach(element => {
        if (element.id == req.params.id) {
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
    const items = req.body;
    var shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    shoppingCart = addItemsToShoppingCart(shoppingCart, items);
    fs.writeFileSync(shoppingcartDB, JSON.stringify(shoppingCart) , 'utf8');
    res.send("Saved!");
});


app.delete('/shoppingcart', (req, res) => {
    const items = req.body;
    var shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    shoppingCart = removeItemsFromShoppingCart(shoppingCart, items);
    fs.writeFileSync(shoppingcartDB, JSON.stringify(shoppingCart) , 'utf8');
    res.send("Removed!");
});

app.listen(port, () => {
    console.log('We are live on ' + port);
}); 

function addItemsToShoppingCart(shoppingCart, items) {
    var found;
    shoppingCart.forEach(element => {
       if (element.id == items.id) {
            element.items = element.items.concat(items.items.filter(i => !element.items.includes(i)));
            found = 1;
       };
    });
    if (!found) {
        shoppingCart.push(items);
    }
    return shoppingCart;
}

function removeItemsFromShoppingCart(shoppingCart, items) {
    var found;
    shoppingCart.forEach(element => {
       if (element.id == items.id) {
            element.items = element.items.filter(i => !items.items.includes(i));
            found = 1;
       };
    });
    return shoppingCart;
}

