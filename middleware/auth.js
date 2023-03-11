const JWT = require('jsonwebtoken');
const accessToken = require('../config/config.development.json').ACCESS_TOKEN;

const auth = (req,res,next) => {
try {
    if(!(req.headers.authorization))
    return res.status(401).json({ msg: "Authorization Required" });

    const token = req.headers.authorization.split(' ')[1];
    
    if(!token) 
    return res.status(401).json({ msg: "Authorization Required" }); 

    JWT.verify(token,accessToken,(error,user)=>{
        if(error) 
        return res.status(401).json({ msg: "Invalid authorization" });
        req.user = user
        next()
    })

} catch (error) {
    return res.status(500).json({ msg: error.message });
}
}

module.exports = auth;