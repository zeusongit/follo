
let postController = require (__dirname+'/../../controllers/postController/postController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');


routes.post('/:community/post', authChecker, postController.createPost);

routes.put('/:community/post/:id', authChecker, postController.updatePost);

routes.get('/:community/post', authChecker, postController.getAllPostOfComm);

//routes.get('/:community/post', postController.getAllPostOfComm);

routes.get('/:community/post/:id', authChecker, postController.getSinglePost);

routes.post('/:community/:post/comment',authChecker, postController.createComment);

//routes.put('/:commentId',authChecker, postController.updateComment);

routes.put('/:post/delete/:comment',authChecker, postController.checkCreator, postController.deleteComment);

//routes.get('/:post/comment',authChecker, postController.getAllPostComments);

module.exports = routes;