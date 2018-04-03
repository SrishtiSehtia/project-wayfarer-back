var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');


// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) // handle json data

app.get('/', function (req, res) {
  res.send('This is the API for project Wayfarer!');
})

// USER 

//get all users
app.get('/api/users', function(req, res) {
  db.User.find().populate('users')
  .exec(function(err, users) {
    if (err) { return console.log("index error: " + err); }
    res.json(users);
  });
})

app.post('/api/users', function (req, res) {
  // create new user with form data (`req.body`)
var newUser = new db.User({
  email: req.body.email,
  password: req.body.password
  });
  // save newCity to database
  newUser.save(function(err, user){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", user.email);
    // send back the user!
    res.json(user);
  });
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
    .populate('post')
    .exec(function (err, deletedCity) {
      res.json(deletedCity);
  });
});


// POSTS //
//get all posts
app.get('/api/posts', function(req, res) {
  db.Post.find()
  .exec(function(err, posts) {
    if (err) { return console.log("index error: " + err); }
    res.json(posts);
  });
})

//show post
app.get('/api/posts/:id', function (req, res) {
  db.Post.findOne({_id: req.params.id }, function(err, data) {
      res.json(data);
  });
})

//create new post
app.post('/api/posts', function (req, res) {
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
    res.json(post);
  });
})

// delete post
app.delete('/api/posts/:id', function (req, res) {
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
