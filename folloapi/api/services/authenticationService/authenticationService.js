var mongoose = require('mongoose');

var User = mongoose.model('userModel');

module.exports.addUser = (userDetails) => {
    var user = new User(userDetails);
    return user.save();
}