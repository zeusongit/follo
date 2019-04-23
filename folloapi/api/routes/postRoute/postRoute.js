
let postController = require (__dirname+'/../../controllers/postController/postController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');
const imageUploadForPost = require (__dirname+'/../../middleware/imageUploadForPost.js');


routes.post('/:community/post', authChecker,imageUploadForPost, postController.createPost);

routes.put('/:community/post/:id', authChecker,imageUploadForPost, postController.updatePost);

routes.get('/:community/post', postController.getAllPostOfComm);

routes.get('/:community/post/:id', postController.getSinglePost);

routes.get('/:community/post/:id/upvote', authChecker, postController.upvotePost);

routes.get('/:community/post/:id/downvote', authChecker, postController.downvotePost);

module.exports = routes;