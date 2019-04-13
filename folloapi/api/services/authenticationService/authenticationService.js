let userModel = require(__dirname+'/../../models/userModel/userModel.js');
let bcrypt = require('bcrypt');

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');



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

aws.config.update({
    secretAccessKey: "dvg+11AaBXhMy68YEpaQ3zZXvgYTbqRrmIk0ltPu",  
    accessKeyId: "AKIAI67WZDSJA64GRTIQ",
    region: 'us-east-1' // region of your bucket
});

 const s3Config = new aws.S3();


const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: 'hex-clan-follo',
    acl: 'public-read',
    // metadata: function (req, file, cb) {
    //   cb(null, {fieldName: file.fieldname});
    // },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


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
            console.log("cannot save");
            console.log(err);
            reject({signupSuccess: false});
        })
    })
}


module.exports = {
    signup,
    upload
}


