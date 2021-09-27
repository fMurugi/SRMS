var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('Returns login html page');
});


router.post('/login', function(req, res, next) {
  res.send('expects login data');
});

router.get('/registration', function(req, res, next) {
  res.send('returns registration html page');
});


router.post('/registration', function(req, res, next) {
  res.send('expects registration data');
});

module.exports = router;

// user management