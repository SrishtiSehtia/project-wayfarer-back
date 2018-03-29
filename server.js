var express = require('express');
var app = express();
var db = require('./models');

const cities = [
      {
        name: 'San Francisco',
        country: 'USA'
      },
      {
        name: 'Los Angeles',
        country: 'USA'
      },
      {
        name: 'New Delhi',
        country: 'India'
      }
    ];

app.get('/', function (req, res) {
  res.send('Hello World!');
})

//get all cities
app.get('/api/cities', function(req, res) {
  res.json(cities);
})

//create new city
app.post('api/cities', function (req, res) {

})

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening at http://localhost:5000/');
  });
