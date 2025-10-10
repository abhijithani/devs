const jwt = require("jsonwebtoken")
const User = require("../models/user")

//user auth middleware
const userAuth = async (req, res, next) => {
    
    try{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).send("please login")
    }
    const decodedObj = await jwt.verify(token, "DEVS@2025");

    const {_id} = decodedObj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("user Not found")
    }
    req.user = user; 
    next();
}
catch (err) {
    res.status(400).send("ERROR :" + err.message);
}
}

module.exports = {
    userAuth,
}