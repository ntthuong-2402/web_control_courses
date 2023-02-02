const mongoose = require("mongoose");

var cmt = new mongoose.Schema({
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
    content: {
        type: String,
        require: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Course",
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("comment", cmt);