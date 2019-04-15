let mongoose = require(__dirname+'/../db/mongoose.js');
let validator = require('validator');
let bcrypt = require('bcryptjs');

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
        unique: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
    },

    tokens: [{
        token:{
            type: String
        }
    }]

}

let userSchema = new mongoose.Schema(userSchemaTemplate, { collection: 'users' });


userSchema.statics.findByCredentials = async function (email, password){
    let user = await this.findOne({email })
    if (!user){
        throw new Error('not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
        throw new Error('not found');
    }
    return user;
}


userSchema.statics.findByEmail = async function (email) {
    let user = await this.findOne(
        {"email": email}
    )
    if (!user){
        throw new Error('not found')
    }
    return user
}

userSchema.methods.removeToken = async function (jwttoken){
    this.tokens.filter(token => {
        if (token.token === jwttoken){
            console.log(token);
            return false
        }else{
            return true;
        }
    })

}

module.exports = userSchema;