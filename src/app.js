const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("welcome")
})

app.use("/test",(req,res) => {
    res.send("testing guys")
})

app.use("/hello",(req,res) => {
    res.send("hello guys")
})

app.listen(3000, () => {
    console.log("server is lisetening in port 3000");
    
}); 