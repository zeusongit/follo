const jwt = require('jsonwebtoken');
const jwtkey = 'follo';
const config = require(__dirname+'/../../config/config.js');
let User = require(__dirname+'/../models/userModel/userModel.js');

let authChecker = async (req, res, next) => {
    if (req.header('Authorization')){
        const token = req.header('Authorization').replace('Bearer ','');
        const decodedToken = jwt.verify(token, config.jwtkey);
        const user = await User.findOne({email: decodedToken.email, 'tokens.token': token});
        
        
        if (!user){
            res.status(401).send({
                status: 400,
                message: 'Un-authenticated'
            });
        }else{
            await user.ok();
            req.user = user;
            req.token = token;

        next();
        
        }
        
    }
    else{
        res.status(401).send({
            status: 401,
            msg:"unauthenticated"
        });
    }
}

module.exports = authChecker;