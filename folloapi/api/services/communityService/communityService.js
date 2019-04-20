let commModel = require(__dirname + "/../../models/community/commModel.js");

let createCommunity = (newCommObj, userId) => {
  return new Promise((resolve, reject) => {
    let newCommunity = new commModel(newCommObj);
    newCommunity.memberIds.push(userId);
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

let joinCommunity = (communityName, userId) => {
  return new Promise((resolve, reject) => {     
    commModel.findOneAndUpdate({
      cname: communityName,
      $push: {
        "memberIds": userId
      },
      upsert: false,
      new: true
    }).then((doc) => {
      console.log(doc);
      resolve({
        community: doc,
        joinStatus: true
      })
    }).catch(err => {
      console.log(err);
      reject({
        joinStatus: false
      });
    });
  })
}
module.exports = {
  createCommunity,
  getAllCommunities,
  findCommunity,
  joinCommunity
};