let commModel = require(__dirname + "/../../models/community/commModel.js");
let userModel = require(__dirname + "/../../models/userModel/userModel.js");

let createCommunity = (newCommObj, user) => {
  return new Promise((resolve, reject) => {
    let newCommunity = new commModel(newCommObj);
    newCommunity.memberIds.push({
      member: user._id
    });
    newCommunity
      .save()
      .then((doc) => {
        updateUser(user, doc);
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

let updateUser = (user, community) => {
  console.log(user._id, community._id, community.cname);
  userModel.findByIdAndUpdate(user._id, {
    $push: {
      "createdCommunities": {
        "community.id": community._id,
        "community.name": community.cname
      }
    }
  }, {
    new: true,
    upsert: false
  }).exec();

}

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
        "memberIds": {
          member: userId
        }
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