let routes = require('express').Router();
const authRouthes = require (__dirname+'/authenticationRoutes/authenticationRoute.js');


// route for signup
routes.post('/signup/', authRouthes.signup);
// route for login
routes.post('/login/', authRouthes.login);


module.exports = {
    routes
}