const express = require("express");
const { userAuth } = require("../middlwares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectinRequest");

//Get all the pending conncection requests 
userRouter.get("/user/requests/received", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await  ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"])

        res.json({
            message: "Data  fetched succesfully",
            data: connectionRequest
        })
    }
    catch (err){
        res.status(400).send("ERROR : " + err.message)
    }
})


userRouter.get("/user/connection", userAuth , async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status : "accepted"},
                {fromUserId: loggedInUser._id, status : "accepted"}
            ]
        }).populate("fromUserId", ["firstName", "lastName"]).
        populate("toUserId", ["firstName", "lastName"])
        
        const data = connectionRequests.map((row) =>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({ data });
    }
    catch (err){
        res.status(400).send("ERROR: " + err.message)
    }
})
module.exports = userRouter