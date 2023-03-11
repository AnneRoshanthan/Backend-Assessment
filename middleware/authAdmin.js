const User = require('../models/user');

const authAdmin = async (req,res,next) =>{
    const user = await User.findById(req.user.id);
    if(user.isAdmin == false)
        return res.status(400).json({msg:"Access denied"});
        next()
}

module.exports = authAdmin;