let userModel = require(__dirname + "/../../models/userModel/userModel.js");
const env = require(__dirname + "/../../../config/s3.env.js");

let bcrypt = require("bcrypt");

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

let hashPassword = newUserObj => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newUserObj.password, 10, (err, hash) => {
      if (!err) {
        newUserObj.password = hash;
        resolve(newUserObj);
        return;
      } else {
        reject(err);
      }
    });
  });
};

let hashPasswordSync = password => {
  return bcrypt.hashSync(password, 10);
};

aws.config.update({
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: env.AWS_ACCESS_KEY,
  region: env.REGION // region of your bucket
});

const s3Config = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: env.USERS_BUCKET_NAME,
    acl: "public-read",
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

let signup = newUserObj => {
  return new Promise((resolve, reject) => {
    newUserObj.password = hashPasswordSync(newUserObj.password);
    let newUser = new userModel(newUserObj);
    newUser
      .save()
      .then(doc => {
        console.log(doc);
        resolve({ signupSuccess: true });
      })
      .catch(err => {
        console.log("cannot save");
        console.log(err);
        reject({ signupSuccess: false });
      });
  });
};

module.exports = {
  signup,
  upload
};
