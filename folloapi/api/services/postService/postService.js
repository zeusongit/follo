let Post = require(__dirname + "/../../models/post/postModel.js");

let commModel = require(__dirname + "/../../models/community/commModel.js");

let communityService = require(__dirname +
  "/../../services/communityService/communityService.js");

let createPost = async (newPostObj, commname, user) => {

  let community = await communityService.getCommunityByName(commname); //get community
  console.log(commname);
  return new Promise((resolve, reject) => {
    let newPost = new Post(newPostObj);
    newPost.created_by = (({
      _id,
      username
    }) => ({
      _id,
      username
    }))(user);
    newPost.parent_community = (({
      _id,
      cname
    }) => ({
      _id,
      cname
    }))(community);
    console.log("np" + newPost);
    newPost.save()
      .then((doc) => {
        console.log(doc);
        resolve({
          post: doc
        });
      })
      .catch((err) => {
        console.log("cannot save post");
        console.log(err);
        reject(null);
      })
  })
}

let updatePost = (id, newPostObj) => {
  return new Promise((resolve, reject) => {
    newPostObj.last_updated_on = Date.now();
    Post.findByIdAndUpdate(id, newPostObj, {
        new: true
      })
      .then((doc) => {
        console.log(doc);
        resolve({
          post: doc
        });
      })
      .catch((err) => {
        console.log("cannot update post");
        console.log(err);
        reject(null);
      })
  })
}

let getPostById = async (id) => {
  try {
    let post = await Post.findById(id);
    return post;
  } catch (e) {
    console.log(e);
    return null;

  }
}

let getAllPostsByUser = async (user) => {
  try {
    let posts = await Post.findByUser(user.username);
    return posts;
  } catch (e) {
    console.log(e);
    return null;

  }
}
let getAllPostsByCommunity = async (community) => {
  try {
    console.log(community);
    let posts = await Post.findByCommunity(community);
    console.log(posts);
    return posts;
  } catch (e) {
    console.log(e);
    return null;

  }
}
let searchPosts = async (key) => {
  try {
    let posts = await Post.searchPost(key);
    return posts;
  } catch (e) {
    console.log(e);
    return null;

  }
}

let createCommentForPost = (comments, postId, user) => {
  return new Promise((resolve, reject) => {
    Post.findByIdAndUpdate(postId, {
      $push: {
        "comments": {
          "comment.username": user.username,
          "comment.commentDate": Date.now(),
          "comment.commentText": comments.text
        }
      }
    }, {
      new: true
    }).then((doc) => {
      resolve({
        post: doc
      });
    }).catch((err) => {
      console.log("cannot update post");
      console.log(err);
      reject(null);
    })
  })

}

let checkCreator = (postId, user) => {
  return new Promise((resolve, reject) => {
    Post.findById(postId).then((doc) => {
      console.log("Community Creator "+doc.created_by._id);
      console.log("Authorozed Use"+ user._id);
      console.log(doc.created_by._id == user._id);    
      
      
      if (doc.created_by._id == user._id) {
        resolve({
          follower: true
        })
      } else {
        resolve({
          follower: false
        })
      }
    }).catch((err) => {
      console.log("cannot find post");
      console.log(err);
      reject(null);
    })
  })
}

// let updateComment = (updatedComment, postId, user) => {
//   console.log(updatedComment, postId, user);
//   Post.update({'comments._id': })
// }

let checkFollower = (user, communityName) => {
  return new Promise((resolve, reject) => {
    commModel.findOne({
      cname: communityName,
      isActive: true
    }).exec().then((doc) => {
      console.log(doc);
      if (doc.memberIds.members.filter(e => e.id === user._id)) {
        resolve({
          follower: true
        })
      } else {
        resolve({
          follower: false
        })
      }
    }).catch(err => {
      console.log(err);
      reject(null);
    });
  })
}

let deleteComment = (postId, commentId) => {
    return new Promise((resolve, reject) => {
        Post.findByIdAndUpdate(postId, {
          $pull: {
            "comments": {
              "_id": commentId
            }
          },
          new: true
        }).then(() => {
          resolve({
            deleteStatus: true
          })
        }).catch(err => {
          console.log(err);
          reject({
            deleteStatus: false
          })
        })
      })
    }
  
  // let getAllPostComments = (postId) =>{
  //   return new Promise((resolve,reject) => {
  //     Post.findOne({
  //       _id: postId
  //     }).sort('comments.comment.commentDate').then(result => {
  //       resolve({
          
  //       })
  //     }).catch(err => {
  //         console.log(err);
  //         reject({
  //           deleteStatus: false
  //         })
  //       })
  //   })

  // }

    module.exports = {
      createPost,
      getPostById,
      getAllPostsByUser,
      getAllPostsByCommunity,
      updatePost,
      searchPosts,
      createCommentForPost,
      checkFollower,
      checkCreator,
      deleteComment,
      //getAllPostComments
    };