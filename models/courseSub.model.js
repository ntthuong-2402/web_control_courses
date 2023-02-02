const mongoose = require("mongoose");

var courseSub = new mongoose.Schema({

    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Course",
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    userName: {
        type: String,
        require: true,
        ref: "User",
    },
    courseName: {
        type: String,
        require: true,
        ref: "Course",
    },
    imageID: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model("courseSub", courseSub);