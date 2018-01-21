const express = require('express');
const axios = require('axios');
const keys = require('./keys');

const app = express();
const API_KEY = keys.key;
const ROOT_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=';
const SENT_IMAGES = 20;
let images;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  next();
});

axios.get(`${ROOT_URL}${API_KEY}&per_page=500&format=json&nojsoncallback=1`)
  .then((response) => {
    images = response.data.photos.photo.map((item) => {
      return {
        id: item.id,
        secret: item.secret,
        title: item.title,
        src: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`,
        original: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`,
      };
    });
  })
  .catch((error) => {
    console.log(error);
  });


app.get('/', (req, res) => {
  res.send(images.slice((req.query.page - 1) * SENT_IMAGES, req.query.page * SENT_IMAGES));
});

app.listen(3000, () => console.log('Express server is up and running!'));
