const express = require("express");

const app = express();


app.use("/user",(req, res, next) => {
    //route handler
    next()
    res.send({firstName : "abhijith", lastName: "M S"});
}, (req, res) => {
    //Route handler
    res.send({ firstName: "sivajith", lastName: "M S" });

})


app.listen(3000, () => {
    console.log("server is lisetening in port 3000");
    
}); 