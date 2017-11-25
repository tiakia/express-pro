var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

router.get('/',function(req, res, next){
  console.log(req.cookies);
  res.render('main/index');
});


module.exports = router;
