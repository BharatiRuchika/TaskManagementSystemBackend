var express = require('express');
var router = express.Router();
var user = require("../module/user")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',user.registerUser)
router.post('/validate',user.validateUser)

module.exports = router;
