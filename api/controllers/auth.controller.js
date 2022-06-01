const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config")


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
            var token = jwt.sign({ id: user.id }, config.secrets.jwt, {
                expiresIn: config.secrets.jwtExp
            })
            res.status(200);
            res.send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
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