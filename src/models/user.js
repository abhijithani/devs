const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
    },
    lastName:{
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address")
            }
        }
    },
    password: {
        type: String,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("password is not strong ")
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not Valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "http/pic"
    },
    about: {
        type: String,
        default: "this is default about",
    },
    skills: {
        type: [String],
    }

},
{
    timestamps: true,
}
)

const User = mongoose.model("User", userSchema);

module.exports = User;