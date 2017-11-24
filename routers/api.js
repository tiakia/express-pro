var express = require('express');
var router = express.Router();
var User = require('./../models/User.js');

//统一返回格式
let responseData;

//没有挂载路径的中间件，应用的每个请求都会执行该中间件
router.use(function(req, res, next){
  responseData = {
    code: 0,
    msg: '',
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
      confirmpassword = req.body.confirmpassword,
      registerDay = req.body.date;
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
  //用户名是否被注册
  User.findOne({
    username: username
  }).then((userInfo) => {
    //console.log(userInfo);
    if(userInfo){
      responseData.code = 5;
      responseData.msg = "用户名已经被注册";
      res.json(responseData);
      return;
    }
    //保存用户注册的信息到数据库中
    return new User({
      username: username,
      password: password,
      registerDay: registerDay,
      identity: 1
    }).save();
  }).then((newUserInfo) => {
    //console.log("newUserInfo: "+newUserInfo.username);
    responseData.code = 4;
    responseData.msg = "注册成功";
    res.json(responseData);
  }).catch((err)=>{
    console.log(err)
  });
});

router.post('/user/login',function(req, res, next){
  let username = req.body.username,
      password = req.body.password;
  //验证登录的用户名和密码是否正确
  if(username === '' || password === ''){
    responseData.code = 1;
    responseData.msg = "用户名或密码不能为空";
    res.json(responseData);
    return;
  }
  //从数据库中查询
  User.findOne({
    username: username,
    password: password
  }).then((userInfo) => {
    if(!userInfo){
      responseData.code = 2;
      responseData.msg = "用户名或密码错误";
      res.json(responseData);
      return;
    }
    let identityName = '会员';
    if(userInfo.identity === 0){
      identityName = "管理员";
    }
    responseData.code = 3;
    responseData.userInfo ={
      username: userInfo.username,
      uid: userInfo._id,
      date: userInfo.registerDay,
      identity: identityName
    };
    responseData.msg = "登录成功";
    res.cookies.set('userInfo', JSON.stringify(responseData.userInfo));
    res.json(responseData);
    return;
  }).catch((err)=>{
    console.log(err);
  });
});

module.exports = router;
