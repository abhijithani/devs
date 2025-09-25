const express = require("express");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user")
const { validateSignUpdata } = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParse = require("cookie-parser")
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParse());
const {userAuth} = require("./middlwares/auth")


app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("user is not present")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            //Create a JWT Token

            const token = await jwt.sign({ _id: user._id }, "DEVS@2025", {expiresIn: "1d"});
            console.log(token);


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

app.get("/profile",userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    const user = req.user;
    console.log("sending a connectin request");
    res.send(user.firstName+ "sent the connection request")
})

//get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    // console.log(userEmail);

    try {
        const user = await User.findOne({ emailId: userEmail })
        res.send(user);
        // const user = await User.find({emailId : userEmail});
        // if(user.length === 0) {
        //     res.status(404).send("user Not found")
        // }
        // else{
        //     res.send(user)
        // }
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const userDelete = await User.findByIdAndDelete(userId);
        res.send("user deleted sucessfully")
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

//update data of the user
app.patch("/user/:userId", async (req, res) => {
    const UserId = req.params?.userId;
    const data = req.body;


    try {
        const ALLOWED_UPDATES = [
            "photoUrl", "about", "userId", "skills", "gender", "age"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("update not allowed");
        }

        if (data?.skills.length > 10) {
            throw new Error("update not allowed")
        }

        const user = await User.findByIdAndUpdate({ _id: UserId }, data, {
            returnDocument: "after",
            runValidators: true,
        })
        res.send("user updated successufully")
    }
    catch (err) {
        res.status(400).send("something went wrong" + err.message)
    }
})

connectDB().then(() => {
    console.log("Database connection is established")
    app.listen(3000, () => {
        console.log("server is lisetening in port 3000");
    });
})
    .catch((err) => {
        console.error("Database cannot be connected!");
    })
