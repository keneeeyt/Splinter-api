//authentication of the user

const jwt = require('jsonwebtoken')

const secret = "stokedlifestyle";

module.exports.createAccessToken = (user) => {
    const info = {
        _id: user._id,
        email: user.email,
        isAdmin:user.isAdmin
    }
    return jwt.sign(info, secret, {})
}

//Verify user

module.exports.verify = (req,res,next) => {
    let token = req.headers.authorization;
    if(typeof token !== "undefined"){
        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (error, data)=> {
          if(error){
            return res.send({auth:"FAILED!!"});
          } else{
            next();
          }
        })
    } else {
        return res.send({auth:"FAILED!!"})
    }
}

//TOKEN DECRYPTION

module.exports.decode = (token)=>{
    if(typeof token !== "undefined"){
        token = token.slice(7, token.length);

        return jwt.verify(token, secret,(error,data)=>{
            if(error){
                return null
            } else{
                return jwt.decode(token, {complete:true}).payload;
            }
        })
    } else {
        return null;
    }

}

