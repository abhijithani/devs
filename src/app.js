const express = require("express");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user")
const { validateSignUpdata } = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParse = require("cookie-parser")
const jwt = require("jsonwebtoken");
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParse());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("Database connection is established")
    app.listen(3000, () => {
        console.log("server is lisetening in port 3000");
    });
})
    .catch((err) => {
        console.error("Database cannot be connected!");
    })
