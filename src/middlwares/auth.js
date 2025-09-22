const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!");
    const token = "xyz";
    const authentication = token === "xyz"
    if (!authentication) {
        res.status(401).send("Unathourised request");
    }
    else {
        next();
    }

}

const useAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!");
    const token = "xyz";
    const authentication = token === "xyz"
    if (!authentication) {
        res.status(401).send("Unathourised request");
    }
    else {
        next();
    }

}

module.exports = {
    adminAuth,
    useAuth,
}