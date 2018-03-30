var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    profilePic: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
