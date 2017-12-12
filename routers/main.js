var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
let Category = require('./../models/Categories');

router.get('/',function(req, res, next){
  //console.log(req);
  res.render('main/index');
});

router.get('/nav',(req, res, next)=>{
  let responseData = {
    code: 0,
    msg: '',
    data: null
  }
  Category.find().then((category)=>{
    if(!category){
        responseData.code = -1;
        responseData.msg = '分类失败,请重试';
        responseData.data = null;
        res.json(responseData);
        return;
    }else{
        responseData.code = 1;
        responseData.msg = '成功';
        responseData.data = category;
        res.json(responseData);
        return;
    }
  }).catch(err=>console.log(err));
})

module.exports = router;
