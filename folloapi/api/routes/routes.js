let routes = require('express').Router();
const authRouthes = require (__dirname+'/authenticationRoutes/routes.js');


// route for signup
routes.post('/signup/', authRouthes.signup);
// route for login
routes.post('/signup/', authRouthes.login);


module.exports = {
    routes
}