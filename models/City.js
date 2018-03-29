var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
    name: String,
    country: String,
    image: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

var City = mongoose.model('City', CitySchema);

module.exports = City;
