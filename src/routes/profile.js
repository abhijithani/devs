const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlwares/auth")
const {validataEditProfileData} = require("../utils/validation")
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if (!validataEditProfileData(req)) {
            throw new Error("invalid Edit Request");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])
        
        await loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName},Profile updated successfully`,
            data: loggedInUser
        });
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})

module.exports = profileRouter;