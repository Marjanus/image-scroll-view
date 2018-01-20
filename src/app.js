const express = require('express');
const app = express();
const axios = require('axios');

const keys = require('../keys');
const API_KEY = keys.key;

app.get('/', (req, res) =>

  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=10&format=json&nojsoncallback=1`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    })
);

app.listen(3000, () => console.log('Listening on 3000'));
