let mongoose = require('mongoose');
const env = require(__dirname + "/../../config/database.config.js");

//const server = 'mongodb://localhost:27017';
//const db = 'follo';
const CANNOT_CONNECT_DB = `Cannot Connect to to MondoDB mongodb://localhost:27017`;

// connect to mongoose
mongoose.connect(env.URL, {useNewUrlParser: true});

// return this connection to be used throughout the application
module.exports = mongoose;