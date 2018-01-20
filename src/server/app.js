const express = require('express');
const axios = require('axios');
const keys = require('../../keys');

const app = express();
const API_KEY = keys.key;
const ROOT_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=';

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  next();
});


app.get('/', (req, res) => {
  axios.get(`${ROOT_URL}${API_KEY}&per_page=10&format=json&nojsoncallback=1`)
    .then((response) => {
      const imagesData = response.data.photos.photo.map((item) => {
        return {
          id: item.id,
          title: item.title,
          src: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
        };
      });
      res.send(imagesData);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('Listening on 3000'));
