const validator = require("validator");


const validateSignUpdata = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is Not valid");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("email is Not Valid");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("password is not Strong");
    }
};

module.exports = {
    validateSignUpdata,
}