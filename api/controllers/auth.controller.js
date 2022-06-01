const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config")

//TODO - Add refresh tokens
//TODO - Make refresh tokens stored in cookie
//TODO - Make JWT tokens stored in memory
//TODO - implement duplicate refresh token usage invalidates entire chain
//
exports.register = async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            username: req.body.username,
            email: req.body.email,
            gradeLevel: req.body.gradeLevel,
            password: req.body.password,
            role: req.body.role
        });
        var result = await user.save();
        res.status(200);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send({
            message: error.message,
            keyPattern: error.keyPattern
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const passwordMatches = await user.comparePassword(req.body.password);
        if (passwordMatches) {
            var token = jwt.sign({ id: user._id }, config.secrets.jwt, {
                expiresIn: config.secrets.jwtExp
            })
            res.status(200);
            req.session.token = token;
            res.send({
                id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(401);
            res.send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

exports.logout = async (req, res) => {
    try {
        req.session = null;
        res.status(200);
        res.send({ message: "You have been logged out!" });
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}