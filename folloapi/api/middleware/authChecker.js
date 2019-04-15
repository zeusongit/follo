const jwt = require('jsonwebtoken');
const jwtkey = 'follo';
let User = require(__dirname+'/../models/userModel/userModel.js');

let authChecker = async (req, res, next) => {
    if (req.header('Authorization')){
        let token = req.header('Authorization').replace('Bearer ','');
        let decodedToken = jwt.decode(token, jwtkey);
        console.log(decodedToken.toString());
        let email = decodedToken.email;
        console.log(email);
        try{
            let user = User.findByEmail(email);
            next();
        }
        catch(e){
            console.log(e);
            res.status(401).send({
                status: 401,
                msg:"unauthenticated"
            })
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