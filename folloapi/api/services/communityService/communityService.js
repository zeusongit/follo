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

let getCommunityByName = async (communityname) => {
  try {   
    let community = await commModel.findCommunityByName(communityname);
    console.log("cc:"+community);
    return community;
  }
  catch (e) {
    console.log("cce:"+e);
    return null;
  }
}
let getAllCommunities = async () => {
  try {   
    let communities = await commModel.findAllCommunities();
    console.log("cc:"+communities);
    return communities;
  }
  catch (e) {
    console.log("cce:"+e);
    return null;
  }
}


let findCommunity = (communityName) => {
  const community = commModel.findOne({
    cname: communityName, isActive: true
  }).exec();
  return community;
}

let joinCommunity = (communityName, user) => {
  return new Promise((resolve, reject) => {
    commModel.findOneAndUpdate({
      cname: communityName,
      $push: {
        "memberIds": {
          member: user._id
        }
      },
      upsert: false,
      new: true
    }).then((doc) => {
      console.log(doc);
      updateUserFollowCommunity(user, doc)
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

let updateUserFollowCommunity = (user, community) => {
  console.log(user._id, community._id, community.cname);
  userModel.findByIdAndUpdate(user._id, {
    $push: {
      "followingCommunities": {
        "community.id": community._id,
        "community.name": community.cname
      }
    }
  }, {
    new: true,
    upsert: false
  }).exec();
}

let deleteCommunity = (communityName) => {
  return new Promise((resolve, reject) => {
    commModel.findOneAndUpdate({
      cname: communityName,
      $set: {
        isActive: false
      },
      upsert: false,
      new: true
    }).then(() => {
      resolve({
        deleteStatus: true
      })
    }).catch(err => {
      console.log(err);
      reject({
        deleteStatus: false
      });
    });

  });
}

let unfollowCommunity = (communityName, user) => {
  return new Promise((resolve, reject) => {
    let userId = user._id;    
    commModel.findOneAndUpdate({
      cname: communityName,
      $pull: {
        "memberIds": {
         "member" : userId
        }
      }
    }).then(() => {
      unfollowUserCommunity(userId,communityName);
      resolve({
        unfollowStatus: true
      })
    }).catch(err => {
      console.log(err);
      reject({
        unfollowStatus: false
      });
    });
  });
}

let unfollowUserCommunity = (userId,communityName) => {
  userModel.findByIdAndUpdate(userId,{
    $pull: {
      "followingCommunities" :{
        "community.name" : communityName
      }
    }
  }).exec();
}

module.exports = {
  createCommunity,
  getAllCommunities,
  findCommunity,
  joinCommunity,
  deleteCommunity,
  unfollowCommunity,
  getCommunityByName
};