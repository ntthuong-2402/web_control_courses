var session = require('express-session');
const mongoose = require("mongoose");
const { db } = require('../models/course.model');

const course = require('../models/course.model');
const lession = require('../models/lession.model');
const userModel = require('../models/user.model');
const courseSub = require('../models/courseSub.model');
const thongkeModel = require("../models/thongke.model");
const commentModel = require('../models/comment.model');

module.exports = {
    showData: async(request, response) => {
        if (request.session.role == "user") {
            course.find({}, function(err, data) {
                if (data) {
                    response.render('index', {
                        dataCustomer: {
                            id: request.session ? request.session.ma : false,
                            name: request.session.hoten,
                        },
                        course: data,
                    });
                }
            })
        } else {
            if (request.session) {
                // delete session object
                request.session.destroy(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        console.log("session", request.session)
                        course.find({}, function(err, data) {
                            if (data) {
                                response.render('index', {
                                    dataCustomer: {
                                        id: request.session ? request.session.ma : false,
                                        // name: request.session.hoten,
                                    },
                                    course: data,
                                });
                            }
                        })
                    }
                });
            }
        }
    },
    showDetailCourse: async(req, res) => {
        if (req.session.login) {
            course.findOne({ _id: req.params._id }, function(err, data) {
                commentModel.find({}, function(err, cmt) {
                    if (data || cmt) {
                        res.render('CourseDetail', {
                            dataCustomer: {
                                id: req.session ? req.session.ma : false,
                                name: req.session.hoten,
                            },
                            course: data,
                            commentt: cmt
                        });
                    }
                })
            })
        } else {
            res.redirect('/login');
        }
    },
    showlession: async(req, res) => {
        if (req.session.login) {
            course.findOne({ _id: req.params._id }, function(err, data) {
                lession.find({ courseID: data._id }, function(err, less) {
                    if (data || less) {

                        db.collection('coursesubs').insertOne({
                            courseID: req.params._id,
                            userID: req.session.ma,
                            userName: req.session.hoten,
                            imageID: data.imageID,
                            courseName: data.name
                        })
                        course.updateMany({ _id: req.params._id }, { $set: { subscribe: parseInt(data.subscribe) + 1 } },
                            function(err, result) {
                                if (result) {
                                    console.log('Updated');
                                }
                            }
                        )

                        res.render('lessionlist', {
                            dataCustomer: {
                                id: req.session ? req.session.ma : false,
                                name: req.session.hoten,
                            },
                            lession: less,
                            course: data
                        });

                    }
                })
            })
        } else {
            res.redirect('/login');
        }
    },

    logOut: function(request, response) {
        if (request.session.role == "user") {
            // delete session object
            request.session.destroy(function(err) {
                if (err) {
                    return next(err);
                } else {
                    course.find({}, function(err, data) {
                        if (data) {
                            thongkeModel.findOne({ _id: '62724d472e1dc5134584f0c9' }, function(err, tk) {
                                if (tk) {
                                    thongkeModel.updateMany({ _id: '62724d472e1dc5134584f0c9' }, {
                                            $set: {
                                                login: tk.login - 1,
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
                            response.render('index', {
                                dataCustomer: {
                                    id: request.session ? request.session.ma : false,
                                    // name: request.session.hoten,
                                },
                                course: data,
                            });
                        }
                    })
                }
            });
        } else {
            request.redirect('/admin')
        }
    },

    searchCourse: function(req, res) {

        var key_search = req.query.search;
        // userModel.findOne({}, function(err, users) {
        lession.find({}, function(err, pro) {
            if (pro) {
                var pros = [];
                pros = pro;
            }
            var result = pros.filter((user) => {
                return user.name.toLowerCase().indexOf(key_search.toLowerCase()) !== -1;
            })

            res.render('search', {
                dataCustomer: {
                    id: req.session ? req.session.ma : false,
                    name: req.session.hoten,
                },
                course: result
            })
        })

    },
    mycourse: async(request, response) => {
        if (request.session.login) {
            courseSub.find({}, function(err, cs) {
                var m = [];

                if (cs) {
                    var arr = cs.filter(a => {
                        var arr1 = new Array(a);
                        return arr1;

                    })
                    for (var i = 0; i < arr.length; i++) {
                        var l = String(arr[i].userID);
                        if (l == String(request.session.ma)) {
                            // console.log(request.session.ma);
                            m[i] = arr[i];
                        }

                    }

                    response.render('mycourse', {
                        dataCustomer: {
                            id: request.session ? request.session.ma : false,
                            name: request.session.hoten,
                        },
                        coursesub: m,
                    });
                }
            })
        } else {
            response.redirect('/login');
        }
    },
    addCmt: function(request, res) {

        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        db.collection('comments').insertOne({
            userID: request.session.ma,
            courseID: request.body._id,
            userName: request.session.hoten,
            content: request.body.commentData,
            date: date
        })

        res.json({ stt: true });

    },

}