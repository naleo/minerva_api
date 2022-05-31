const User = require("../models/user");
const bcrypt = require("bcrypt")


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
        res.send(error);
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const loggedIn = await user.comparePassword(req.body.password);
        res.send(loggedIn);
    } catch (error) {
        res.status(500);
        res.send(error);
    }

}