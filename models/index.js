var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proj-wayfarer');

var CityModel = require('./models/City');
var PostModel = require('./models/Post');
var UserModel = require('./models/User');

  module.exports = {
    City: CityModel,
    Post: PostModel,
    User: UserModel
  }
