const JWT = require('jsonwebtoken');
const accesstoken = require('../config/config.development.json').ACCESS_TOKEN;
const refreshtoken = require('../config/config.development.json').REFRESH_TOKEN;

const createAccessToken = (ID)=>{
    return JWT.sign(ID,accesstoken,{
        expiresIn:"1d"
    })
}

const createRefreshToken = (ID)=>{
    return JWT.sign(ID,refreshtoken,{
        expiresIn:"1d"
    })
}

const verifyToken = (token)=>{
 return JWT.verify(token,refreshtoken,(error,user)=>{
    if(error) 
    return res.status(400).json({ msg: "please login or signup" });
    
    const accesstoken = createAccessToken({id:user._id})
    return accesstoken;
 })
}

module.exports.createAccessToken = createAccessToken
module.exports.createRefreshToken = createRefreshToken
module.exports.verifyToken = verifyToken