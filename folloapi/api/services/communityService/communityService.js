const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

let commModel = require(__dirname + "/../../models/community/commModel.js");
const env = require(__dirname + "/../../../config/s3.env.js");

aws.config.update({
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: env.AWS_ACCESS_KEY,
  region: env.REGION // region of your bucket
});

const s3Config = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: env.COMMUNITY_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

let createCommunity = newCommObj => {
  return new Promise((resolve, reject) => {
    let newCommunity = new commModel(newCommObj);
    newCommunity
      .save()
      .then((doc)=>{
        console.log(doc);
        resolve({
          community: doc          
        });
      })
      .catch(err => {
        console.log(err);
        reject(null);
      });
  });
};

let getAllCommunities = () => {
  const communities = commModel.find().exec();
  return communities;
};

module.exports = {
  upload,
  createCommunity,
  getAllCommunities
};