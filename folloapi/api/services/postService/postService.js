let Post = require(__dirname + "/../../models/post/postModel.js");
let userModel = require(__dirname + "/../../models/userModel/userModel.js");
let commModel = require(__dirname + "/../../models/community/commModel.js");
let communityService = require(__dirname +
"/../../services/communityService/communityService.js");   

let createPost = async (newPostObj,commname,user,ufile) => {
  
    let community = await communityService.getCommunityByName(commname); //get community
    console.log(commname);
    return new Promise((resolve, reject) => {    
    let newPost = new Post(newPostObj);
    if(ufile){
      ufile.forEach(f => {
        newpost.post_media.push({"url":f});  
      });      
    }
    console.log(ufile);
    newPost.created_by = (({ _id,username }) => ({ _id,username }))(user);
    newPost.parent_community = (({ _id,cname }) => ({ _id,cname }))(community);
    console.log("np"+newPost);
    newPost.save()
        .then((doc) => {
          console.log(doc);
          addPostToUser(doc,user);
          addPostToCommunity(doc,community);
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

  let updatePost = (id,newPostObj) => {
    return new Promise((resolve, reject) => {
      newPostObj.last_updated_on=Date.now();
      Post.findByIdAndUpdate(id, newPostObj,{new:true})
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
    }
    catch (e) {
      console.log(e);
      return null;
  
    }
  }

  let getAllPostsByUser = async (user) => {
    try {
      let posts = await Post.findByUser(user.username);
      return posts;
    }
    catch (e) {
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
    }
    catch (e) {
      console.log(e);
      return null;
  
    }
  }
  let searchPosts = async (key) => {
    try {
      let posts = await Post.searchPost(key);
      return posts;
    }
    catch (e) {
      console.log(e);
      return null;
  
    }
  }
  let upvotePost = (currPost,currUser) => {
    return new Promise((resolve, reject) => {
    userModel.findOne({'upvotes': {$elemMatch: {'post.id': currPost}}}, (err, user) => {
      if (err){
        console.log("errrrr"+err);
          return err;
      }    
      if (user) {
          console.log("user did upvote already, so remove it from user object upvoted posts and decrement upvote count");
          userModel.findByIdAndUpdate(currUser._id, {
            $pull: {
              "upvotes": {
                "post.id": currPost
              }
            }          
          }, { new: true }).exec()
            .then(() => {
              console.log("-s-s");
              Post.findByIdAndUpdate(currPost, {
                $inc: { upvotes: -1 }         
              }, { new: true }).exec().then((doc)=>{
                resolve({
                  upvotes: doc.upvotes
                });
              })
            })         
            .catch((err) => {
              console.log("cannot update post");
              console.log(err);
              reject(null);
            })
      } else {
        console.log("user did not vote already so add upvote");
        userModel.findByIdAndUpdate(currUser._id, {
          $push: {
            "upvotes": {
              "post.id": currPost
            }
          }     
        }, { new: true }).exec()
            .then(() => {
              console.log("-g-g"+currPost);
              Post.findByIdAndUpdate(currPost, {
                $inc: { upvotes: 1 }         
              }, { new: true }).exec().then((doc)=>{
                resolve({
                  upvotes: doc.upvotes
                });
              })
            })
            .catch((err) => {
              console.log("cannot update post");
              console.log(err);
              reject(null);
            })    
      }
      userModel.findOne({'downvotes': {$elemMatch: {'post.id': currPost}}}, (err, user) => {
        if (err){
          console.log("errrrr"+err);
            return err;
        }    
        if (user) {
            console.log("user did downvote already, so remove it from user object downvoted posts and decrement downvote count");
            userModel.findByIdAndUpdate(currUser._id, {
              $pull: {
                "upvotes": {
                  "post.id": currPost
                }
              }          
            }, { new: true }).exec()
              .then(() => {
                console.log("-s-s");
                Post.findByIdAndUpdate(currPost, {
                  $inc: { upvotes: -1 }         
                }, { new: true }).exec().then((doc)=>{
                  resolve({
                    upvotes: doc.upvotes
                  });
                })
              })         
              .catch((err) => {
                console.log("cannot update post");
                console.log(err);
                reject(null);
              })
        } else {
          console.log("user did not vote already so add upvote");
          userModel.findByIdAndUpdate(currUser._id, {
            $push: {
              "upvotes": {
                "post.id": currPost
              }
            }     
          }, { new: true }).exec()
              .then(() => {
                console.log("-g-g"+currPost);
                Post.findByIdAndUpdate(currPost, {
                  $inc: { upvotes: 1 }         
                }, { new: true }).exec().then((doc)=>{
                  resolve({
                    upvotes: doc.upvotes
                  });
                })
              })
              .catch((err) => {
                console.log("cannot update post");
                console.log(err);
                reject(null);
              })    
        }  
      });  
    });
  })
  }
  let downvotePost = (currPost,currUser) => {
    return new Promise((resolve, reject) => {
    userModel.findOne({'downvotes': {$elemMatch: {'post.id': currPost}}}, (err, user) => {
      if (err){
        console.log("errrrr"+err);
          return err;
      }    
      if (user) {
          console.log("user did downvote already, so remove it from user object downvoted posts and decrement downvote count");
          userModel.findByIdAndUpdate(currUser._id, {
            $pull: {
              "downvotes": {
                "post.id": currPost
              }
            }          
          }, { new: true,safe: true, }).exec()
            .then(() => {
              console.log("-s-s");
              Post.findByIdAndUpdate(currPost, {
                $inc: { downvotes: -1 }         
              }, { new: true }).exec().then((doc)=>{
                resolve({
                  downvotes: doc.downvotes
                });
              })
            })         
            .catch((err) => {
              console.log("cannot update post");
              console.log(err);
              reject(null);
            })
      } else {
        console.log("user did not vote already so add downvotes");
        userModel.findByIdAndUpdate(currUser._id, {
          $push: {
            "downvotes": {
              "post.id": currPost
            }
          }, $pull: {
            "upvotes": {
              "post.id": currPost
            }
          }
        }, { new: true,safe: true, }).exec()
            .then(() => {
              console.log("-g-g"+currPost);
              Post.findByIdAndUpdate(currPost, {
                $inc: { downvotes: 1 }         
              }, { new: true }).exec().then((doc)=>{
                resolve({
                  downvotes: doc.downvotes
                });
              })
            })
            .catch((err) => {
              console.log("cannot update post");
              console.log(err);
              reject(null);
            })    
      }  
    });
  })
  }

  let addPostToUser = (post, user) => {
    console.log(post._id, user._id);
    userModel.findByIdAndUpdate(user._id, {
      $push: {
        "createdPosts": {
          "post.id": post._id
        }
      }
    }, {
      new: true,
      upsert: false
    }).exec();  
  }
  let addPostToCommunity = (post, community) => {
    console.log(post._id, community._id, community.cname);
    commModel.findByIdAndUpdate(community._id, {
      $push: {
        "posts": {
          "post.id": post._id
        }
      }
    }, {
      new: true,
      upsert: false
    }).exec();  
  }
  

  module.exports = {
    createPost,
    getPostById,
    getAllPostsByUser,
    getAllPostsByCommunity,
    updatePost,
    searchPosts,
    upvotePost,
    downvotePost
  };