const express = require('express');
const app = express();
const port = 3000
const stringSimilarity = require('string-similarity');
const fs = require('fs');

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tag-recognition', async(req, res) => {
    const result = await extractTagsFromImage();
    const tags = result.split("\n");
    res.send(JSON.stringify({productTags:tags.filter(v=>v!='')}));
});

app.get('/search',(req, res) => {
    const tags = req.query.tag;
    const productList = JSON.parse(fs.readFileSync('products.json','utf8'));
    let result = [];
    productList.forEach(function(product){
        const similarityQF = stringSimilarity.compareTwoStrings(tags,product.productTags.toString());
        console.log(similarityQF);
        //TODO: review this alghoritm if the number of tags is diferent of tag query parameters
        if(similarityQF>0.1) {
            result.push(product);
        }
    });
    res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function extractTagsFromImage() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const fileName = 'http://www.hipersuper.pt/wp-content/uploads/2018/01/nsl-498x1024.jpg'
    //const fileName = 'milk.jpeg';
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    return detections[0].description;
}