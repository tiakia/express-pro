var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

router.get('/',function(req, res, next){
  //console.log(req);
  res.render('main/index',{
    name: 'tiankai'
  });
});


module.exports = router;
