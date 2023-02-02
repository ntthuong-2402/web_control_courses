const mongoose = require("mongoose");

var lession = new mongoose.Schema({
    courseID: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Course",
    },
    name: {
        type: String,
        require: true
    },
    videoID: {
        type: String,
        required: true
    },
    idclass: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Lession", lession);