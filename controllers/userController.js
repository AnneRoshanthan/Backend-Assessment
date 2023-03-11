const bcrypt = require('bcrypt');
const Users = require('../models/user');
const { createAccessToken, createRefreshToken, verifyToken } = require('../helper/createToken')

const userController = {
    signUp: async (req, res) => {
        try {
            const { email, password, fullname } = req.body;

            // password validation
            const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/;
            const upperCase = (/[A-Z]{1}/);
            // email validation
            const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            // required validation
            if (!email || !password || !fullname)
                return res.status(400).json({ msg: "Required fields" });

            // Checking email validation
            if (!(email.match(emailValidation) && !email.match(upperCase)))
                return res.status(400).json({ msg: "Enter a valid email" });

            // Checking emaili exists or not
            const Email = await Users.findOne({ email })
            if (Email)
                return res.status(400).json({ msg: "Email already exists" });

            //checking password validation
            if (!(password.match(passwordValidation)))
                return res.status(400).json({ msg: "minimum 8 characters including uppercase,lowercase and number" })


            const Hash = await bcrypt.hash(password, 10);

            const newUser = new Users({
                email,
                password: Hash,
                fullname
            });

            await newUser.save();

            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "user/refresh_token"
            });
            res.json({ accesstoken });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    signIn :async (req, res) => {
        try {
            const { email,password } = req.body;

            // find the user
            const user = await Users.findOne({email});
            if(!user) 
            return res.status(400).json({ msg: "unable to find please signup" });

            // compare the password
            const isMatch = bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({ msg: "username or pasword is wrong" });

            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "user/refresh_token"
            });
            res.json({ accesstoken });

        } catch (error) {
            return  res.status(500).json({ msg: error.message });
        }
    },
    signOut: async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path:'user/refresh_token'});
            return res.status(200).json({ msg: "Logged out" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    validateRefreshToken:async (req,res)=>{
        try {
            const refeshToken = req.cookies.refreshtoken;
            if(!refeshToken)
            return res.status(400).json({ msg: "please login or signup" });

            const accesstoken = verifyToken(refeshToken);
            return res.status(200).json({accesstoken});

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
   
}

module.exports = userController;