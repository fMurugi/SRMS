var express = require('express');
var router = express.Router();
var db=require('../database');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('resultsPage');
// });

router.post('/',(req,res)=>{
  console.log("boyParser:",req.body)
  const reg = req.body.regNo;
  const dep = req.body.dep;
  console.log("data stored in variables:" ,reg )
  res.redirect(`/results/${reg}`)
});


router.get('/:reg', function(req, res, next) {
  var reg = req.params.reg;
  var sql =  `select  students.studentId, studentsresults.marks, subjects.subjectsName, subjects.subjectCode  from students   join studentsresults on students.studentId = studentsresults.studentId left join subjects on subjects.subjectId = studentsresults.subjectId where students.RegNo = ${reg}`;
  var inq = `select students.LastName from students where RegNo = ${reg}`
  db.query(inq,function(err,studentData,fields){
    if(err) throw err;
    db.query(sql,function(err,data,fields){
    if (err) throw err;
    res.render('resultsPage',{title:'student results',results:data, userDetails:studentData});
  });
  });
  
});

module.exports = router;
