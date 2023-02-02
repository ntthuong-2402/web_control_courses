const cookieSession = require('cookie-session');
const mongoose = require("mongoose");
const { response } = require('express');
var mongo = require('../routes/mongo');
var session = require('express-session');


const userModel = require("../models/user.model")
const thongkeModel = require("../models/thongke.model");




mongoose.connect(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;


exports.login = async(req, res) => {
    userModel.findOne({ email: req.body.email, matkhau: req.body.matkhau }, function(err, user) {

        var userr = [];
        userr = user;
        if (user) {
            if (userr.role == "admin") {
                var session;
                session = req.session;
                session.login = true;
                session.emailadmin = req.body.email;
                session.hotenadmin = userr.name;
                session.roleadmin = userr.role;
                session.idea = userr._id;

                res.status(200).redirect('/admin');
            } else {
                var session;
                session = req.session;
                session.login = true;
                session.email = req.body.email;
                session.hoten = userr.name;
                session.role = userr.role;
                session.ma = userr._id;
                thongkeModel.findOne({ _id: '62724d472e1dc5134584f0c9' }, function(err, tk) {
                    if (tk) {
                        thongkeModel.updateMany({ _id: '62724d472e1dc5134584f0c9' }, {
                                $set: {
                                    access: tk.access + 1,
                                    login: tk.login + 1
                                }
                            },
                            function(err, result) {
                                if (result) {
                                    console.log('Updated');
                                }
                            }
                        )
                    }
                })

                res.status(200).redirect('/');
            }

        } else {
            res.status(400).send(err);
        }


    });



}
exports.registerAdmin = (req, res) => {
    console.log(req.body);
    const admin = new userModel(req.body);

    userModel.findOne({ email: req.body.email }, function(err, results) {
        if (results) {
            res.status(404).send({ message: "Failed! Username is already in use!" });
        } else {
            admin.save();
            res.render('login');
        }
    });

}

exports.register = (req, res) => {
    console.log(req.body);
    const reguser = new userModel(req.body);

    userModel.findOne({ email: req.body.email }, function(err, results) {
        if (results) {
            res.status(404).send({ message: "Failed! Email is already in use!" });
        } else {
            reguser.save();
            res.render('login');
        }
    });

}