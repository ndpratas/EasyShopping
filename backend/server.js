const express = require('express');
const app = express();
const port = 8001;
const stringSimilarity = require('string-similarity');
const fs = require('fs');
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tag-recognition', async(req, res) => {
    const result = await extractTagsFromImage();
    const tags = result.split("\n");
    const searchResult = scoreResults(searchInProducts(tags))
        .sort((a, b) => b.score - a.score);
    res.send(searchResult);
});

app.get('/search',(req, res) => {
    const tags = req.query.tag.split(",");
    const searchResult = scoreResults(searchInProducts(tags))
        .sort((a, b) => b.score - a.score);
    res.json(searchResult);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function searchInProducts(tags) {
    const productList = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    let result = [];
    productList.forEach(function(product) {
        for (let tag of tags) {
            const bestMatch = stringSimilarity.findBestMatch(tag,product.productTags);
            console.log(bestMatch.bestMatch.rating);
            if (bestMatch.bestMatch.rating > 0.5){
                result.push(product);
                break;
            }
        };
    });
    return result;
}

function scoreResults(results) {
    const pastPurchases = JSON.parse(fs.readFileSync('purchases.json', 'utf8'));
    results.forEach(result =>
        result.score = pastPurchases.reduce((accOut, purchase) => 
            accOut + purchase.products.reduce((accIn, productId) => 
                accIn + (productId === result.id ? 1 : 0)
            , 0)
        , 0)
    );
    return results;
}

async function extractTagsFromImage() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const fileName = 'http://www.hipersuper.pt/wp-content/uploads/2018/01/nsl-498x1024.jpg'
    //const fileName = 'milk.jpeg';
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    return detections[0].description;
};