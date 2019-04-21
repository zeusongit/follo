let postService = require(__dirname +
    "/../../services/postService/postService.js");         
    
let createPost = async (req, res) => {
  let postJSON=req.body;
  let result = await postService.createPost(postJSON,req.params.community,req.user);
  console.log(result);
  if (result) {
      res.send(result);
  }
  else {
      res.status(400).send({
          status: 400,
          message: 'cannot create post'
      });
  }
}

let updatePost = async (req, res) => {
    console.log(req.body+req.params.id);
    let postJSON=req.body;
    let result = await postService.updatePost(req.params.id,postJSON);
    console.log(result);
    if (result) {
        res.send(result);
    }
    else {
        res.status(400).send({
            status: 400,
            message: 'cannot update post'
        });
    }
  }

let getAllPostOfUser = async (req, res) => {
    let result = await postService.getAllPostsByUser(req.user);
    console.log(result);
    if (result) {
        res.send(result);
    }
    else {
        res.status(400).send({
            status: 400,
            message: 'cannot get posts'
        });
    }
  }

  let getAllPostOfComm = async (req, res) => {
    let result={}
    if(req.query.key){
        result = await postService.searchPosts(req.query.key);
    }
    else{
        result = await postService.getAllPostsByCommunity(req.params.community);
    }
    console.log(result);
    if (result.length != 0) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot get posts'
        });
    }
  }

  let getSinglePost = async (req, res) => {
    console.log(req.params.id);
    let result = await postService.getPostById(req.params.id);
    console.log(result);
    if (result) {
        res.send(result);
    }
    else {
        res.status(400).send({
            status: 400,
            message: 'cannot get post'
        });
    }
  }

  let searchPost = async (req, res) => {
    console.log(req.params.key);
    let result = await postService.searchPost(req.params.key);
    console.log(result);
    if (result) {
        res.send(result);
    }
    else {
        res.status(400).send({
            status: 400,
            message: 'cannot get post'
        });
    }
  }

  module.exports = {
    createPost,
    updatePost,
    getAllPostOfUser,
    getAllPostOfComm,
    getSinglePost,
    searchPost
  };
  