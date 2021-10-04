var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var db = require('../database');

// get:  localhost:3000/results/:userId
// - get userId param
// - user userId to get user and their results from database
// - finally, render the results ejs file


router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.post('/',(req,res)=>{
    console.log("boyParser:",req.body)
    const reg = req.body.regNo;
    const dep = req.body.dep;
    console.log("data stored in variables:" ,reg )
    res.redirect(`/${reg}`)
});



// department           |
// | students             |
// | studentsresults      |
// | subjectanddepartment |
// | subjects 


// select students.studentId, studentsresults.marks, subjects.subjectsName, subjects.subjectCode 
// from students  
// join studentsresults on students.studentId = studentsresults.studentId  
// left join subjects on subjects.subjectId = studentsresults.subjectId
// where students.studentId = 2;




//write a route for home page
// router.get('/',function(req,res,next){
//     res.render('home');
// });

// route for myResults Page
// router.get('/',function(req,res,next){
//     var data = 'select * from studentsresults';
//     var stringfiedData = data.toString();
//     console.log(stringfiedData);
//     res.render('stringfiedData');
// })

module.exports = router;
