const mongoose = require("mongoose");
mongoose.set('debug', true);


function dbconnect() {
    const db = process.env.MONGO_URI || "mongodb://mongo:27017/dev"
    //mongoose.set('debug', true);
    mongoose.connect(db);
    return mongoose.connection;
}

function dbclose() {
    return mongoose.disconnect();
}

module.exports = { dbconnect, dbclose }