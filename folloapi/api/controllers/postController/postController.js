let postService = require(__dirname +
    "/../../services/postService/postService.js");         
    
let createPost = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ','');           
  console.log(req.body);
  let postJSON=req.body;
  console.log("params:"+JSON.stringify(req.params));
  let result = await postService.createPost(postJSON,req.params.community,token);
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
    console.log(req.body);
    let postJSON=req.body;
    let result = await postService.updatePost(postJSON,req.params.community);
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

let getAllPostOfUser = async (req, res) => {
    let result = await postService.getAllPostsByUser();
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
    let result = await postService.getAllPostsByCommunity(req.params.community);
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
  