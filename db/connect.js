const mongoose = require("mongoose");


const connectDB = url => {
    return mongoose.connect(url, { dbName: `Task-Manager` });
}

module.exports = connectDB;