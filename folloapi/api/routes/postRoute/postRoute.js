
let postController = require (__dirname+'/../../controllers/postController/postController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');


routes.post('/:community/post', authChecker, postController.createPost);

routes.put('/:community/post', authChecker, postController.updatePost);

routes.get('/:community/post', authChecker, postController.getAllPostOfComm);

routes.get('/:community/post/:id', authChecker, postController.getSinglePost);

routes.get('/:community/post/:key', authChecker, postController.searchPost);

module.exports = routes;