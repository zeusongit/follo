let mongoose = require(__dirname+'/../db/db-mongoose.js');

let userSchema = require(__dirname+'/../schema/userSchema.js')

let userModel = new mongoose.model('userModel', userSchema);

module.exports ={ 
    userModel
}