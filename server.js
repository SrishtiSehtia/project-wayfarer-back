var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

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

//show city
app.get('/api/cities/:id', function (req, res) {
  db.City.findOne({_id: req.params.id }, function(err, data) {
      res.json(data);
  });
})

//create new city
app.post('/api/cities', function (req, res) {
  // create new city with form data (`req.body`)
var newCity = new db.City({
  name: req.body.name,
  country: req.body.country
  });
  // save newCity to database
  newCity.save(function(err, city){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", city.name);
    // send back the city!
    res.json(city);
  });
})

// delete city
app.delete('/api/cities/:id', function (req, res) {
  // get city id from url params (`req.params`)
  console.log('cities delete', req.params);
  var cityId = req.params.id;
  // find the index of the city we want to remove
  db.City.findOneAndRemove({ _id: cityId })
    .populate('post')
    .exec(function (err, deletedCity) {
      res.json(deletedCity);
  });
});

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening at http://localhost:5000/');
  });
