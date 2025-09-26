const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")
const { validateSignUpdata } = require("../utils/validation")

authRouter.post("/signUp", async (req, res) => {
    try {
        //Validation of data
        validateSignUpdata(req);

        const { firstName, lastName, emailId, password } = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);


        //Creating a new instance fo the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send("user added sucessfully");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("user is not present")
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await user.getJWT();

            res.cookie("token", token);
            res.send("login succesfully")
        }
        else {
            throw new Error("password Not correct")
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null,{
        expires: new Date(Date.now()),
    })
    res.send("logout Succesfully");
})

module.exports  = authRouter;