const express = require('express');
const app = express();
const port = 8001;
const stringSimilarity = require('string-similarity');
const vision = require('@google-cloud/vision');
const fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

const parser = bodyParser.text({ type: 'text/plain' ,limit: '50mb'});

app.post('/tag-recognition', parser, async(req, res) => {
    const result = await extractTagsFromImage(req.body);
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
    const productList = JSON.parse(fs.readFileSync('products-db.json', 'utf8'));
    let result = [];
    productList.forEach(function(product) {
        for (let tag of tags) {
            const bestMatch = stringSimilarity.findBestMatch(tag,product.productTags);
            if (bestMatch.bestMatch.rating > 0.5){
                result.push(product);
                break;
            }
        };
    });
    return result;
}

function scoreResults(results) {
    const pastPurchases = JSON.parse(fs.readFileSync('purchases-db.json', 'utf8'));
    results.forEach(result =>
        result.score = pastPurchases.reduce((accOut, purchase) => 
            accOut + purchase.products.reduce((accIn, productId) => 
                accIn + (productId === result.id ? 1 : 0)
            , 0)
        , 0)
    );
    return results;
}

async function extractTagsFromImage(imageBase64) {
    const fileName = 'image.jpeg';
    fs.writeFileSync(fileName, decodeBase64Image(imageBase64).data, console.log);    
    const client = new vision.ImageAnnotatorClient();
    const [resultText] = await client.textDetection(fileName);
    const detections = resultText.textAnnotations;
    // const [resultLabels] = await client.labelDetection(fileName);
    return detections.length && detections[0].description;
}

function decodeBase64Image(dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const response = {};
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
  }