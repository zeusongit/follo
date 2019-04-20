let commModel = require(__dirname + "/../../models/community/commModel.js");

let createCommunity = newCommObj => {
  return new Promise((resolve, reject) => {
    let newCommunity = new commModel(newCommObj);
    newCommunity
      .save()
      .then((doc) => {
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

let findCommunity = (communityName) => {
  const community = commModel.findOne({
    cname: communityName
  }).exec();
  return community;
}

module.exports = {
  createCommunity,
  getAllCommunities,
  findCommunity
};