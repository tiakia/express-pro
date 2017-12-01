var express = require('express');
var router = express.Router();
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

router.get('/',(req, res, next)=>{
  res.render('admin/index');
});

module.exports = router;
