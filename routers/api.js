var express = require('express');
var router = express.Router();
//统一返回格式
let responseData;

router.use( function(req, res, next){
  responseData = {
    code: 0,
    msg: ''
  }
  next();
});


//用户注册
/*
1.用户名不能为空
2.密码不能为空
3.俩次输入密码是否一致

数据库查询
用户名是否被注册
*/
router.post('/user/register',function(req, res, next){
  let username = req.body.username,
      password = req.body.password,
      confirmpassword = req.body.confirmpassword;
  console.log(req.body);
  if( username === ''){
    responseData.code = 1;
    responseData.msg = "用户名不能为空";
    res.json(responseData);
    return;
  }
  if( password === ''){
    responseData.code = 2;
    responseData.msg = "密码不能为空";
    res.json(responseData);
    return;
  }
  if( password !== confirmpassword ){
    responseData.code = 3;
    responseData.msg = "俩次输入的密码不一致";
    res.json(responseData);
    return;
  }

  responseData.code = 4;
  responseData.msg = "注册成功";
  res.json(responseData);
});

module.exports = router;
