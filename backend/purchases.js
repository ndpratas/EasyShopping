const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080
const fs = require('fs');
const purchasesDB = "purchases-db.json"
const shoppingcartDB = "shoppingcart-db.json"
const purchaseObj = {"id":null,"user_id":null,"products":[]}


app.get('/purchases/id/:id', (req, res) => {
    const purchases = JSON.parse(fs.readFileSync(purchasesDB,'utf8'));

    let element = purchases.find(e => e.id === parseInt(req.params.id));

    element ? res.send(JSON.stringify(element)) : res.status(404).send("Not found");
});

app.get('/purchases/userid/:user_id', (req, res) => {
    const purchases = JSON.parse(fs.readFileSync(purchasesDB,'utf8'));

    let elements = purchases.filter(e => e.user_id === parseInt(req.params.user_id));

    console.log(JSON.stringify(elements));

    elements ? res.send(JSON.stringify(elements)) : res.status(404).send("Not found");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/buy/:user_id', (req, res) => {
    const shoppingCart = JSON.parse(fs.readFileSync(shoppingcartDB,'utf8'));
    let purchases = JSON.parse(fs.readFileSync(purchasesDB,'utf8'));
    let found = false;

    shoppingCart.forEach(element => {
        if (element.user_id == req.params.user_id) {
            const nextId = getNextId(purchases);
            let newPurchaseObj = purchaseObj;

            newPurchaseObj.id = nextId
            newPurchaseObj.user_id = parseInt(req.params.user_id);
            newPurchaseObj.products = element.products;

            purchases.push(newPurchaseObj);
            fs.writeFileSync(purchasesDB, JSON.stringify(purchases) , 'utf8');
            found = true;
        };
     });
     found ? res.send("Saved!") : res.status(404).send("No shoppingCart available");
});

app.listen(port, () => {
    console.log('We are live on ' + port);
}); 

function getNextId(purchases) {
    let nextId = 0;
    purchases.forEach(element => {
       if (element.id > nextId) {
            nextId = element.id
       };
    });
    nextId++;
    return nextId;
}
