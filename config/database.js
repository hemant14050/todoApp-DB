const mongoose = require("mongoose")
const MONGODB_URL = "mongodb+srv://patilhemant14050:JDXZMFnvtFdo72Gq@cluster0.id3gxpy.mongodb.net/todoApp"

exports.connectDB = () => {
    mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to DB successfully!");
    })
    .catch((err) => {
        console.log("Error while connecting to DB.");
        console.log(err);
    })
}