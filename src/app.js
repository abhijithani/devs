const express = require("express");

const app = express();


//Handle Auth Middlewares for all GET, POST...
app.use("/admin",(req, res, next) => {
    console.log("Admin auth is getting checked!");
    const token = "xyz";
    const authentication = token === "xyz"
    if(!authentication){
        res.status(401).send("Unathourised request");
    }
    else{
        next();
    }

});

app.get("/admin/getAllData", (req, res, next) => {
    res.send("all data sent")
});


app.get("/admin/deleteUser", (req, res, next) => {
    res.send("delete a user")
});
 



app.listen(3000, () => {
    console.log("server is lisetening in port 3000");
    
}); 