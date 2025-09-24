const mongoose = require("mongoose");

const  connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://abhijithmscr7_db_user:0jkzAc5D8C1LTyHQ@cluster0.gci7qsa.mongodb.net/devs"
    )
}

module.exports = connectDB

