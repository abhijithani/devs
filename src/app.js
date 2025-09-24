const express = require("express");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user")

app.use(express.json());

app.post("/signUp" ,async (req, res) => {
    // console.log(req.body);
     //Creating a new instance fo the user model
     const user = new User(req.body);
     try {
         await user.save();
         res.send("user added sucessfully");
     }
     catch (err){
        res.status(400).send("Error saving the message" + err.message)
     }
});

//get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    // console.log(userEmail);
    
    try {
        const user = await User.findOne({emailId : userEmail})
        res.send(user);
        // const user = await User.find({emailId : userEmail});
        // if(user.length === 0) {
        //     res.status(404).send("user Not found")
        // }
        // else{
        //     res.send(user)
        // }
    }
    catch (err){
        res.status(400).send("something went wrong")
    }
})

app.get("/feed",async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

app.delete("/user",async (req, res) => {
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
app.patch("/user", async (req, res) => {
    const UserId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({ _id: UserId }, data)
        res.send("user updated successufully")
    }
    catch (err) {
        res.status(400).send("something went wrong")
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
 