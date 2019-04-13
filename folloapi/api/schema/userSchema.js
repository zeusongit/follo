let mongoose = require(__dirname+'/../db/mongoose.js');


let validator = require('validator');

let userSchemaTemplate = {
    firstName: {
        type: String,
        required: true,
        unique: false
    },

    lastName: {
        type: String,
        required: false,
    },

    email: {
        type: String,
        unique: false,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
    }

}

let userSchema = new mongoose.Schema(userSchemaTemplate, { collection: 'users' });


module.exports = userSchema;