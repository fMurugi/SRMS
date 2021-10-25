var express = require('express');
var router = express.Router();
var db = require('../database.js');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
const {isLoggedIn} = require('./decorator-utils')
const sessionConfig = require('../session')

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('students');
});


router.post('/login', (req, res, next) => {
  console.log("boyParser:", req.body)
  const reg = req.body.regNo;
  const dep = req.body.dep;
  const password = req.body.password;

  // compare the password
  db.query(`SELECT * FROM students WHERE RegNo =?`, [reg], function (err, results, fields) {
    if (results.length > 0) {
      let isPasswordCorrect = bcrypt.compareSync(password, results[0].password)

      if (isPasswordCorrect) {
        console.log('REQ', req.session)
        req.session.regNo = reg
        // save session
        
        req.session.save(() => void 0);
        res.redirect(`/results/${reg}`);
      } else {
        // TODO - add a message flash message ui field that displays this information
        res.render('students', { message: 'Please check you account details' })
      }
    } else {
      res.render('students', { message: 'Please check you account details' })
    }
  })

});


router.get('/register', function (req, res, next) {
  res.render('studentReg');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => void 0);
  res.clearCookie(sessionConfig.sessionName);
  res.redirect('/auth/login');
})


router.post('/register', function (req, res, next) {
  // res.json(req.body)
  console.log(req.body);
  const body = req.body;
  const pwd = body.password;
  hashedPassword = bcrypt.hashSync(pwd.toString(), 10);
  let { Fname, Sname, regNo, department } = body;
  // define an array to store data from body

  let sql = `INSERT INTO students(FirstName,LastName,RegNo,departmentId,password)VALUES(?,?,?,?,?)`;
  db.query(sql, [Fname, Sname, regNo, department, hashedPassword], function (err, results) {
    if (err) {
      // redirect to the registration page with an error
      throw err
    };
    if (result) {
      res.redirect('/login')
    }

  });

});


module.exports = router;

// user management