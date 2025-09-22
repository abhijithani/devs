const express = require("express");

const app = express();
const { adminAuth, useAuth } = require("./middlwares/auth")


app.get("/getUserData", (req, res, next) => {
    throw new Error("fdahkjh")
    // try{
    //     res.send("all data sent");
    // }
    // catch(err) {
    //     res.status(500).send("something went wrong contact support")
    // }
});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("something went wrong");
    }
    else {
        res.send("hii")
    }
})


app.listen(3000, () => {
    console.log("server is lisetening in port 3000");

}); 