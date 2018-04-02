var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('This is the API for project Wayfarer!');
})

// CITIES //

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
    .populate('posts')
    .exec(function (err, deletedCity) {
      res.json(deletedCity);
  });
});


// POSTS //
//get all posts
app.get('/api/cities/:city_id/posts', function(req, res) {
  db.City.findOne({_id: req.params.city_id })
  .populate('posts')
  .exec(function (err, foundCity) {
      res.json({posts: foundCity.posts});
  });
})

//show post
app.get('/api/cities/:city_id/posts/:id', function (req, res) {
  db.City.findOne({_id: req.params.city_id })
  .populate('posts')
  .exec(function (err, foundCity) {
      var foundPost = foundCity.posts.find(function(post) {
        return post._id == req.params.id;
      })
      res.json({post: foundPost});
  });
})

//create new post
app.post('/api/cities/:city_id/posts', function (req, res) {
  // create new post with form data (`req.body`)
  var newPost = new db.Post({
  title: req.body.title,
  description: req.body.description,
  // author: req.body.author
  });
  // save newPost to database
  newPost.save(function(err, post){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", post.title);
    // send back the post!
    db.City.findOne({_id: req.params.city_id })
    .populate('posts')
    .exec(function (err, foundCity) {
      foundCity.posts.push(post);
      foundCity.save(function(err, savedCity) {
        if(err){
          return console.log(err);
        }
        else {
          res.json(post);
        }
      })
    })
  });
})

// delete post
app.delete('/api/cities/:city_id/posts/:id', function (req, res) {
  // get post id from url params (`req.params`)
  console.log('posts delete', req.params);
  var postId = req.params.id;
  // find the index of the post we want to remove
  db.Post.findOneAndRemove({ _id: postId })
    .exec(function (err, deletedPost) {
      res.json(deletedPost);
  });
});


app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening at http://localhost:5000/');
  });
