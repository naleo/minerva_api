const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

verifyToken = async (req, res) => {
    let token = req.headers("x-access-token");
    if (!token) {
        res.status(403);
        res.send({ message: "No token provided!"});
        return;
    }
    jwt.verify(token, config.secrets, (err, decoded) => {
        if (err) {
            res.status(401);
            res.send({ message: "Unauthorized"});
            return;
        }
        req.userId = decoded.indexOf;
    })
}

isAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
    } catch (error) {
        res.status(500);
        res.send(error);
        return;
    }
}

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;