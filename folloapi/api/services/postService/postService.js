let Post = require(__dirname + "/../../models/post/postModel.js");
let userService = require(__dirname +
    "/../../services/userService/userService.js");
let communityService = require(__dirname +
"/../../services/communityService/communityService.js");   

let createPost = async (newPostObj,commname,token) => {
    let user = await userService.getUser(false,token); //get user
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

  let updatePost = (newPostObj) => {
    return new Promise((resolve, reject) => {
      let newPost = new Post(newPostObj);
      newPost.last_updated_on=Date.now;
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
      let posts = await User.findByUser(user);
      return posts;
    }
    catch (e) {
      console.log(e);
      return null;
  
    }
  }
  let getAllPostsByCommunity = async (community) => {
    try {
      let posts = await User.findByCommunity(community);
      return posts;
    }
    catch (e) {
      console.log(e);
      return null;
  
    }
  }
  let searchPosts = async (key) => {
    try {
      let posts = await User.searchPost(key);
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