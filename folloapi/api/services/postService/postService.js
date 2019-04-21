let Post = require(__dirname + "/../../models/post/postModel.js");
let userService = require(__dirname +
    "/../../services/userService/userService.js");
let communityService = require(__dirname +
"/../../services/communityService/communityService.js");   

let createPost = async (newPostObj,commname,user) => {
  
    let community = await communityService.getCommunityByName(commname); //get community
    console.log(commname);
    return new Promise((resolve, reject) => {    
    let newPost = new Post(newPostObj);
    newPost.created_by = (({ _id,username }) => ({ _id,username }))(user);
    newPost.parent_community = (({ _id,cname }) => ({ _id,cname }))(community);
    console.log("np"+newPost);
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

  module.exports = {
    createPost,
    getPostById,
    getAllPostsByUser,
    getAllPostsByCommunity,
    updatePost,
    searchPosts
  };