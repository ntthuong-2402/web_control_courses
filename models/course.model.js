const mongoose = require("mongoose");

var course = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    imageID: {
        type: String,
        required: true
    },

    subscribe: {
        type: Number,
    },
    lessionNum: {
        type: String,
    }

})

module.exports = mongoose.model("Course", course);