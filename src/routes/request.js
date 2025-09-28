const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlwares/auth")
const ConnectionRequestModel = require("../models/connectinRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: "Invalid status type:" + status
            })
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: "User not found"})
        }

        //if there is existing connectin Request
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                { fromUserId: toUserId, toUserId: fromUserId}
            ]
        }) 

        if(existingConnectionRequest){
            return res.status(400).send({message: "connection Request already exist"})
        }

        const ConnectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await ConnectionRequest.save();

        res.json({
            message: req.user.firstName+ "is " + status + "in " + toUser.firstName,
            data,
        })

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = requestRouter;