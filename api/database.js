const mongoose = require("mongoose");
const Role = require("./models/role")


const dbconnect = async () => {
    const db = process.env.MONGO_URI || "mongodb://mongo:27017/dev"
    //mongoose.set('debug', true);
    await mongoose.connect(db);
    roleSetup();
    return mongoose.connection;
}

const dbclose = async () => {
    const val = await mongoose.disconnect();
    return val;
}

const roleSetup = async () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "student"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                // console.log("added 'student' to roles collection");
            })
            new Role({
                name: "teacher"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                // console.log("added 'teacher' to roles collection");
            })
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                // console.log("added 'admin' to roles collection");
            })
        }
    })
}

module.exports = { dbconnect, dbclose, roleSetup }