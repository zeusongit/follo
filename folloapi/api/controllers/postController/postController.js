let postService = require(__dirname +
  "/../../services/postService/postService.js");

let createPost = async (req, res) => {
  let postJSON=req.body;
  console.log("file-"+req.files);
  let ufile=null;
  if(ufile){
    ufile=req.files;
  }
  let result = await postService.createPost(postJSON,req.params.community,req.user,ufile);
  console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(400).send({
      status: 400,
      message: "cannot create post"
    });
  }
};

let updatePost = async (req, res) => {
    console.log(req.body+req.params.id);
    let postJSON=req.body;
    let result = await postService.updatePost(req.params.id,postJSON);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot update post'
        });
    }
  }
};

let getAllPostOfUser = async (req, res) => {
    let result = await postService.getAllPostsByUser(req.user);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot get posts'
        });
    }
  }
};

let getAllPostOfComm = async (req, res) => {
  let result = {};
  if (req.query.key) {
    result = await postService.searchPosts(req.query.key);
  } else {
    result = await postService.getAllPostsByCommunity(req.params.community);
  }
  console.log(result);
  if (result.length != 0) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: "cannot get posts"
    });
  }
};

let getSinglePost = async (req, res) => {
  console.log(req.params.id);
  let result = await postService.getPostById(req.params.id);
  console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(400).send({
      status: 400,
      message: "cannot get post"
    });
  }
};

  let getSinglePost = async (req, res) => {
    console.log(req.params.id);
    let result = await postService.getPostById(req.params.id);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot get post'
        });
    }
  }

    let upvotePost = async (req, res) => {
    console.log("--"+req.params.id);
    let result = await postService.upvotePost(req.params.id,req.user);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
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
  } else {
    res.status(400).send({
      status: 400,
      message: "cannot get post"
    });
  }
};

let createComment = async (req, res) => {
  let commentJSON = req.body;
  let result = await postService.createCommentForPost(
    commentJSON,
    req.params.post,
    req.user
  );
  if (result) {
    res.send(result);
  } else {
    res.status(400).send({
      status: 400,
      message: "cannot create comment"
    });
  }
};

let checkCreator = (req, res, next) => {
  postService
    .checkCreator(req.params.post, req.user)
    .then(result => {
      if (result.follower) {
        next();
      } else {
        res.status(400).send({
          message: "Creator mismatch"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

  let downvotePost = async (req, res) => {
    console.log("--"+req.params.id);
    let result = await postService.downvotePost(req.params.id,req.user);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot get post'
        });
    }
  }

let deleteComment = (req, res) => {
  postService
    .deleteComment(req.params.post, req.params.comment)
    .then(result => {
      if (result) {
        res.send({
          message: " Comment deleted Successfully",
          deleteStatus: result.deleteStatus
        });
      } else {
        res.status(400).send({
          message: " Error while deleting",
          deleteStatus: result.deleteStatus
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while Deleting Comment"
      });
    });
};

// let getAllPostComments = (req,res) =>{
//     postService.getAllPostComments(req.params.post).then(result => {
//        res.send({
//            comments: result.comments
//        })
//     }).catch((err) => {
//         res.status(500).send({
//             message: err.message || "Could not get comments"
//         });
//     })
// }

// let updateComment = async (req,res) => {
//     let updateCommentJSON = req.body;
//     let result = await postService.updateComment(updateCommentJSON, req.params.comment, req.user);
//     if (result) {
//         res.send(result);
//     } else {
//         res.status(400).send({
//             status: 400,
//             message: 'cannot update comment'
//         });
//     }
// }

let checkFollower = (req, res, next) => {
  let user = req.user;
  let communityName = req.params.community;

  postService
    .checkFollower(user, communityName)
    .then(result => {
        console.log(result.followerStatus);        
      if (result.followerStatus) {
        next();
      } else {
        res.status(400).send({
          followerStatus: false,
          message: "Please Follow Community"
        });
      }
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error while Checking Follower"
        })
    });
};

  
module.exports = {
  createPost,
  updatePost,
  getAllPostOfUser,
  getAllPostOfComm,
  getSinglePost,
  searchPost,
  createComment,
  checkFollower,
  //updateComment,
  checkCreator,
  deleteComment,
  //getAllPostComments
  upvotePost,
  downvotePost
};

