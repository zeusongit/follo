console.log('loading routes')

let routes = require('express').Router();

console.log('loading authroutes');
const authRouthes = require (__dirname+'/authenticationRoutes/authenticationRoute.js');


// route for signup
routes.post('/signup/', authRouthes.uploadProfilePicture);
// route for login
routes.post('/login/', authRouthes.login);


module.exports = {
    routes
}