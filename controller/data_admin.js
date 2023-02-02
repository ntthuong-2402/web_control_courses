var session = require('express-session');
const mongoose = require("mongoose");

const course = require('../models/course.model');
const lession = require('../models/lession.model');
const userModel = require('../models/user.model');
const courseSub = require('../models/courseSub.model');
const thongkeModel = require("../models/thongke.model");

module.exports = {
    showDataAdmin: async(request, response) => {
        userModel.findOne({ email: request.session.emailadmin }, function(err, user) {
            thongkeModel.findOne({ _id: '62724d472e1dc5134584f0c9' }, function(err, data) {
                if (user || data) {
                    response.render('admin', {
                        name: request.session.hotenadmin,
                        thongke: data
                    })
                } else {
                    response.status(500).send(err);
                }
            })
        })

    },
    addCourse: async(request, response) => {
        const courses = new course(request.body);

        try {
            thongkeModel.findOne({ _id: '62724d472e1dc5134584f0c9' }, function(err, tk) {
                if (tk) {

                    thongkeModel.updateMany({ _id: '62724d472e1dc5134584f0c9' }, {
                            $set: {
                                access: tk.courseNum + 1,
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
            await courses.save();
            response.redirect('/courseAdmin');
        } catch (error) {
            response.status(500).send(error);
        }

    },
    showCourse: async(request, response) => {
        try {
            course.find({}, function(err, products) {
                response.render('courseAdmin', {
                    course: products
                })
            });

        } catch (error) {
            response.status(500).send(error);
        }

    },
    editCourse: function(req, res) {
        course.findOne({ _id: req.params._id }, function(err, pro) {
            if (pro) {
                res.render('edit_form_course', { course: pro });
            }
        });

    },
    editCourseSubmit: function(req, res) {
        var item = {
            name: req.body.name,
            image: req.body.image,
            videoID: req.body.videoID,
            subscribe: req.body.subscribe,
            lessionNum: req.body.lessionNum,
            description: req.body.description

        }
        course.findOne({ _id: req.params._id }, function(err, kq) {
            if (kq) {
                course.updateMany({ _id: req.params._id }, { $set: item },
                    function(err, result) {
                        if (result) {
                            console.log('Updated');
                            res.status(200).redirect("/courseAdmin");
                        }
                    })
            }
        })
    },
    deleteCourse: function(request, response) {
        var id = request.params._id;
        course.deleteOne({ _id: id }, function(err, result) {
            if (result) {
                console.log('Item Delete');
                response.status(200).redirect("/courseAdmin");
            }

        });

    },
    addLession: async(request, response) => {
        const less = new lession(request.body);
        try {
            course.findOne({ _id: request.body.courseID }, function(err, data) {
                if (data) {
                    course.updateMany({ _id: request.body.courseID }, { $set: { lessionNum: parseInt(data.lessionNum) + 1 } },
                        function(err, result) {
                            if (result) {
                                console.log('Updated');
                            }
                        }
                    )
                }
            })
            thongkeModel.findOne({ _id: '62724d472e1dc5134584f0c9' }, function(err, tk) {
                if (tk) {

                    thongkeModel.updateMany({ _id: '62724d472e1dc5134584f0c9' }, {
                            $set: {
                                access: tk.lessionNum + 1,
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
            await less.save();

            response.redirect('/lessionAdmin');
        } catch (error) {
            response.status(500).send(error);
        }

    },
    showLession: async(request, response) => {
        try {
            lession.find({}, function(err, products) {
                response.render('lessionAdmin', {
                    lession: products
                })
            });

        } catch (error) {
            response.status(500).send(error);
        }

    },
    editLession: function(req, res) {
        lession.findOne({ _id: req.params._id }, function(err, pro) {
            if (pro) {
                res.render('edit_form_lession', { lession: pro });
            }
        });

    },
    editLessionSubmit: function(req, res) {
        var item = {
            courseID: req.body.courseID,
            name: req.body.name,
            videoID: req.body.videoID,

        }
        lession.findOne({ _id: req.params._id }, function(err, kq) {
            if (kq) {
                lession.updateMany({ _id: req.params._id }, { $set: item },
                    function(err, result) {
                        if (result) {
                            console.log('Updated');
                            res.status(200).redirect("/lessionAdmin");
                        }
                    })

            }
        })
    },
    deleteLession: function(request, response) {
        var id = request.params._id;
        lession.deleteOne({ _id: id }, function(err, result) {
            if (result) {
                console.log('Item Delete');
                response.status(200).redirect("/lessionAdmin");
            }

        });

    },
    addAcountCustomer: async(request, response) => {
        const accountCustomer = new userModel(request.body);
        try {
            await accountCustomer.save();

        } catch (error) {
            response.status(500).send(error);
        }

    },
    //hiển thị thông tin tài khoản khách hàng
    showAccountCustomer: async(request, response) => {

        try {
            userModel.find({}, function(err, user) {
                response.render('admin_customer', {
                    user: user
                })
            });
        } catch (error) {
            response.status(500).send(error);
        }
    },
    deleteUser: function(request, response) {
        var id = request.params._id;
        userModel.deleteOne({ _id: id }, function(err, result) {
            if (result) {
                console.log('Item Delete');
                response.status(200).redirect("/admin_customer");
            }

        });

    },
    showCourseSub: async(request, response) => {
        try {
            courseSub.find({}, function(err, course) {
                if (course) {
                    response.render('courseSubscribe', {
                        course: course
                    })
                }
            })

        } catch (error) {
            response.status(500).send(error);
        }

    },
    deleteCourseSub: function(request, response) {
        var id = request.params._id;
        courseSub.deleteOne({ _id: id }, function(err, result) {
            if (result) {
                console.log('Item Delete');
                response.status(200).redirect("/courseSub");
            }

        });

    },
}