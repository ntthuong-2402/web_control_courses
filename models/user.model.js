const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true
        },
        ngaysinh: {
            type: String,
            require: true
        }
        // roles: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Role",
        // }, ],
    })
);

module.exports = User;