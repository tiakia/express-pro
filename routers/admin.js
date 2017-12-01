var express = require('express');
var router = express.Router();
var queryString = require('queryString');
var User = require('./../models/User');
//获取用户信息判断是否是管理员
router.use(function(req, res, next){
  try{
    //判断cookie中userInfo是否存在
    let userObj = req.signedCookies.userInfo && JSON.parse(req.signedCookies.userInfo);

    //console.log(userObj);

    if(!userObj){
      res.send("请退出后，重新<a href='/'>登录</a>");
      return;
    }
    //如果存在，判断是否为管理员
    if(userObj.identity){
      next();
    }else{
      res.send('需要管理员权限');
      return;
    }
  }catch(err){
    console.log(err);
    next();
  }
});

/*首页*/
router.get('/',(req, res, next)=>{
  res.render('admin/index');
});

/*
  用户管理
  分页 借助 数据库 的 limit(Number) 函数
  skip(2) 忽略掉前俩条数据
  1: 1-2 skip:0 --> (当前页 - 1) * limit
  2: 3-4 skip:2
*/

router.get('/user',function(req, res, next){
  let bool = /[0-9]*/g.test(req.query.page);
  if(!bool){
    res.send('请输入数字');
    return;
  }
  let page = req.query.page || 1,
      limit = 2,
      skip = (page - 1) * limit;
  console.log(req);
  User.find().limit(limit).skip(skip).then(function(users){
    res.send(users);
  });
});


module.exports = router;
