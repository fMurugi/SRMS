var express = require('express');
var router = express.Router();
var db = require("../database.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('students');
});

// get the registration page
// router.get('/register',function(req,res){
//   res.render('studentReg')
// })

// router.post('/',(req,res)=>{
//   console.log("boyParser:",req.body)
//   const reg = req.body.regNo;
//   const dep = req.body.dep;
//   console.log("data stored in variables:" ,reg )
 
//   res.redirect(`/results/${reg}`)
// });




module.exports = router;
