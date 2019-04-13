let userModel = require(__dirname+'/../../models/userModel/userModel.js');
let bcrypt = require('bcrypt');

let hashPassword = (newUserObj) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(newUserObj.password, 10, (err, hash) => {
            if (!err){
                newUserObj.password = hash;
                resolve(newUserObj);
                return;
            }else{
                reject(err);
            }
        })
    })
}


let hashPasswordSync = (password) => {
    return bcrypt.hashSync(password, 10);
}



let signup = (newUserObj) => {
    return new Promise((resolve, reject) => {
        newUserObj.password = hashPasswordSync(newUserObj.password);
        let newUser = new userModel(newUserObj);
        newUser.save()
        .then((doc) => {
            console.log(doc);
            resolve({signupSuccess: true})
        })
        .catch((err) => {
            console.log(err);
            reject({signupSuccess: false});
        })
    })
}

module.exports = {
    signup
}


