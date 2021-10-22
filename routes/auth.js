var express = require('express');
var router = express.Router();
var db = require('../database.js');
var bodyParser=require('body-parser');
var bcrypt=require('bcrypt');
var session = require('express-session');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('Returns login html page');
});


router.post('/login',(req,res,next)=>{
  console.log("boyParser:",req.body)
  const reg = req.body.regNo;
  const dep = req.body.dep;
  const password = req.body.password;
  console.log(password, typeof password)
  var session
  
  // compare the password
  db.query(`SELECT * FROM students WHERE RegNo =?`,[reg],function(err,results,fields){
    if(results.length>0){
      let isPasswordCorrect =bcrypt.compareSync(password,results[0].password)
      console.log(results[0].password)
      console.log( `== ${req.session}`)

      if (isPasswordCorrect){
        session=req.session;
        session.userid=reg
        res.redirect(`/results/${reg}`)
      } else{
        res.send(`check your password and try again`)
      }
    } else{
      res.send('user not found')
    }
  })
 
});


router.get('/register', function(req, res, next) {
  res.render('studentReg');
});


router.post('/register', function(req, res, next) {
  // res.json(req.body)
  console.log(req.body);
  const body = req.body;
  const pwd = body.password;
  hashedPassword= bcrypt.hashSync(pwd.toString(),10);
  let {Fname,Sname,regNo,department} = body;
  // define an array to store data from body
  
  let sql = `INSERT INTO students(FirstName,LastName,RegNo,departmentId,password)VALUES(?,?,?,?,?)`;
  db.query(sql,[Fname,Sname,regNo,department,hashedPassword],function(err,results){
    if (err) throw err;
    console.log("new user added");

  });
  res.send(`hello  welcome to our website`)
  res.end()
  });


module.exports = router;

// user management