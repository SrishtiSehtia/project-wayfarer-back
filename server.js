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
  res.send('This is the API for project Wayfarer!');
})

//get all cities
app.get('/api/cities', function(req, res) {
  db.City.find().populate('posts')
  .exec(function(err, cities) {
    if (err) { return console.log("index error: " + err); }
    res.json(cities);
  });
})

app.get('/api/cities/:id', function (req, res) {
  db.City.findOne({_id: req.params.id }, function(err, data) {
      res.json(data);
  });
})

//create new city
app.post('/api/cities', function (req, res) {

})

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening at http://localhost:5000/');
  });
