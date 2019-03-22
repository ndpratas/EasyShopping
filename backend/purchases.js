const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080
const fs = require('fs');
const purchasesDB = "purchases-db.json"


app.get('/purchases/:id', (req, res) => {
    const purchases = JSON.parse(fs.readFileSync(purchasesDB,'utf8'));
    var found;
    purchases.forEach(element => {
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

app.post('/purchases', (req, res) => {
    const items = req.body;
    var purchases = JSON.parse(fs.readFileSync(purchasesDB,'utf8'));
    purchases = addItemsToShoppingCart(purchases, items);
    fs.writeFileSync(purchasesDB, JSON.stringify(purchases) , 'utf8');
    res.send("Saved!");
});


app.delete('/purchases', (req, res) => {
    const items = req.body;
    var purchases = JSON.parse(fs.readFileSync(purchasesDB,'utf8'));
    purchases = removeItemsFromShoppingCart(purchases, items);
    fs.writeFileSync(purchasesDB, JSON.stringify(purchases) , 'utf8');
    res.send("Removed!");
});

app.listen(port, () => {
    console.log('We are live on ' + port);
}); 

function addItemsToShoppingCart(purchases, items) {
    var found;
    purchases.forEach(element => {
       if (element.id == items.id) {
            element.products = element.products.concat(items.products.filter(i => !element.products.includes(i)));
            found = 1;
       };
    });
    if (!found) {
        purchases.push(items);
    }
    return purchases;
}

function removeItemsFromShoppingCart(purchases, items) {
    var found;
    purchases.forEach(element => {
       if (element.id == items.id) {
            element.products = element.products.filter(i => !items.products.includes(i));
            found = 1;
       };
    });
    return purchases;
}
