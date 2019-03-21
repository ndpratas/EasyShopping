const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tag-recognition', async(req, res) => {
    const result = await extractTagsFromImage();
    const tags = result.split("\n");
    res.send(JSON.stringify({productTags:tags.filter(v=>v!='')}));
})

app.get('/search',(req, res) => {
    console.log(req.query.tag);
    res.send(req.query.tag);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function extractTagsFromImage() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const fileName = 'milk.jpeg';
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    return detections[0].description;
}