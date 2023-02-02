const mongoose = require("mongoose");

var thongke = new mongoose.Schema({
    access: {
        type: Number,
        require: true,
    },
    login: {
        type: Number,
        require: true,
        default: 0
    },
    courseNum: {
        type: Number,
        require: true,
    },
    lessionNum: {
        type: Number,
        require: true,

    }
})

module.exports = mongoose.model("thongke", thongke);