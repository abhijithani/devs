const express = require("express");

const app = express();
const { adminAuth,useAuth } = require("./middlwares/auth")

//Handle Auth Middlewares for all GET, POST...
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
    res.send("all data sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
    res.send("delete a user");
});
 
app.use("/user/data",useAuth, (req, res,) =>{
    res.send("data is sent");
})

app.use("/user/login", (req, res,) =>{
    res.send("user logged in successfully");
})



app.listen(3000, () => {
    console.log("server is lisetening in port 3000");
    
}); 