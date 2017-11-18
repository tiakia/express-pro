var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  //res.send('index');
  res.render('main/index');
});

module.exports = router;
