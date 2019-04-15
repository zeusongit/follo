let User = require(__dirname+'/../../models/userModel/userModel.js');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtkey = 'follo';


let hashPassword = (pwd) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, (err, hash) => {
            if (!err)
            {
                resolve(hash);
            }else{
                reject(err)
            }
        })
    })
}

let hashPasswordSync = (password) => {
    return bcrypt.hashSync(password, 10);
}


//creates a new model instance, then insets the jwt auth, and attempts to save
//resolve with the new user or rejects with null
let signup = (newUserObj) => {
    return new Promise((resolve, reject) => {
        newUserObj.password = hashPasswordSync(newUserObj.password);
        let newUser = new User(newUserObj);
        let jwttoken = jwt.sign({email: newUser.email}, jwtkey);
        newUser.tokens.push({token: jwttoken})
        newUser.save()
        .then((doc) => {
            console.log(doc);
            resolve({
                user: doc, 
                newToken: jwttoken
            });
          
        })
        .catch((err) => {
            console.log("cannot save");
            console.log(err);
            reject(null);
        })
    })
}


// searches for a user with credentials, adds a new jwt token, and returns the user
let login = async (loginObj) => {

        try{
            let user = await User.findByCredentials(loginObj.email, loginObj.password);
            let jwttoken = jwt.sign({email: user.email}, jwtkey);
            user.tokens.push({token: jwttoken});
            user = await user.save();
            return {email: user.email, token: jwttoken};
        }
        catch (e) {
            console.log(e);
            return null;
            
        }
}

let logout = async (jwttoken) => {

    try{
        
        let user = await User.findByEmail(jwt.decode(jwttoken, jwtkey).email);
        console.log('removing token');
        await user.removeToken(jwttoken);
        await user.save();
        return true;
    }
    catch (e) {
        console.log('cannot logout');
        console.log(e);
        return false;
    }
    

}


module.exports = {
    signup,
    login,
    logout
}


