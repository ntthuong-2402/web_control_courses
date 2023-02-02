const express = require("express");
const app = express();


//-----------------
const {
    addCourse,
    showCourse,
    editCourse,
    editCourseSubmit,
    deleteCourse,
    addLession,
    showLession,
    editLession,
    editLessionSubmit,
    deleteLession,
    showDataAdmin,
    showAccountCustomer,
    deleteUser,
    showCourseSub,
    deleteCourseSub
} = require('../controller/data_admin.js');

//------------------------
app.get("/admin", showDataAdmin);
app.get("/admin_customer", showAccountCustomer);
app.get("/admin_user/delete/:_id", deleteUser);
// app.post("/add_account_admin", addAcountAdmin);

//-----------------course
app.get("/courseAdmin", showCourse);
app.post("/courseAdmin", addCourse);
app.get("/edit_form_course/:_id", editCourse);
app.post("/edit_form_course/:_id", editCourseSubmit);
app.get("/course/delete/:_id", deleteCourse);

//--------------------Lession
app.get("/lessionAdmin", showLession);
app.post("/lessionAdmin", addLession);
app.get("/edit_form_lession/:_id", editLession);
app.post("/edit_form_lession/:_id", editLessionSubmit);
app.get("/lession/delete/:_id", deleteLession);

//---------------------Course SUbscribe
app.get("/courseSub", showCourseSub);
app.get("/courseSub/delete/:_id", deleteCourseSub);



// ------------------------------
const {
    showData,
    showDetailCourse,
    showlession,
    logOut,
    searchCourse,
    mycourse,
    addCmt
} = require('../controller/data.js');
//----------------LogIn
app.get("/", showData);
app.get("/logOut", logOut);
app.get("/course/:_id", showDetailCourse);
app.get("/lessionlist/:_id", showlession);
app.get("/search", searchCourse);
app.get("/mycourse", mycourse);
app.post("/addCmt", addCmt);


module.exports = app;