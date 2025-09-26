const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlwares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("sending a connectin request");
    res.send(user.firstName + "sent the connection request")
})

module.exports = requestRouter;