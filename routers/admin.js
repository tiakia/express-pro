var express = require('express');
var router = express.Router();
var queryString = require('queryString');
var User = require('./../models/User');
var Category = require('./../models/Categories');
//获取用户信息判断是否是管理员
router.use(function(req, res, next){
  try{
    //判断cookie中userInfo是否存在
    let userObj = req.signedCookies.userInfo && JSON.parse(req.signedCookies.userInfo);

    //console.log(userObj);

    if(!userObj){
      res.send("请重新<a href='/'>登录</a>");
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

router.use(function(req, res, next){
  responseData = {
    code: 0,
    msg: '',
    pagination:{
      pageSize: 0,
      data: null
    }
  }
  next();
});

router.get('/userInfo',function(req, res, next){
  let bool = /[0-9]*/g.test(req.query.page);
  if(!bool){
    res.send('请输入数字');
    return;
  }
  let page = req.query.page || 1,
      limit = 10,    //一页显示的条数
      skip = (page - 1) * limit;
  responseData.pagination.pageSize = limit;
  User.count().then(totalCount => {
    responseData.pagination.total = totalCount;
  });
  User.find().limit(limit).skip(skip).then(function(users){
    responseData.data = users;
    responseData.code = 1;
    res.send(responseData);

  });
});


/*
分类首页
**/

router.get('/category', (req, res)=>{
  let page = req.query.page || 1,
      limit = 10,    //一页显示的条数
      skip = (page - 1) * limit;
  responseData.pagination.pageSize = limit;
  Category.count().then(totalCount => {
    responseData.pagination.total = totalCount;
  });
  /*1: 升序 -1: 降序*/
  Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function(category){
    responseData.data = category;
    res.send(responseData);
  });
});

/*
分类添加
*/
router.get('/category/add',(req, res, next)=>{
  let category_name = req.query.categoryName;

  if(!category_name){
    responseData.code = -1;
    responseData.msg = "请输入分类名称";
    res.json(responseData);
    return;
  }

  Category.findOne({
    name: category_name
  }).then((categoryName)=>{
    //console.log(categoryName);
    if(categoryName){
      responseData.code = 1;
      responseData.msg = '该分类已经存在';
      res.json(responseData);
      return;
    }

    return new Category({
      name: category_name
    }).save();

  }).then((newCategory)=>{

    if(newCategory){
      responseData.code = 2;
      responseData.msg = "分类添加成功";
      res.json(responseData);
      return;
    }
  }).catch(err=>{
    console.log(err);
  });
});

/*
分类修改
*/

router.post('/category/edit',(req, res, next)=>{
  let id = req.body.categoryId || '',
      newName = req.body.categoryName;
  Category.findOne({
    _id: id,
  }).then(category=>{
    if(!category){
      responseData.code = -3;
      responseData.msg = '分类不存在，请重新操作';
      res.json(responseData);
      return;
    }else if(category.name.length == 0){
      responseData.code = -2;
      responseData.msg = '请输入一个分类名';
      res.json(responseData);
      return;
    }else if(category.name == newName){
      responseData.code = -3;
      responseData.msg = '没有做修改';
      res.json(responseData);
      return;
    }else{
      return Category.findOne({
        _id: {$ne: id},
        name: newName
      });
    }
  }).then((data)=>{
    if(data){
      responseData.code = -1;
      responseData.msg = '数据库中已经有了该分类';
      res.json(responseData);
      return;
    }else{
      return Category.update({
        _id: id
      },{
        name: newName
      });
    }
  }).then(()=>{
      responseData.code = 1;
      responseData.msg = '修改成功';
      res.json(responseData);
      return;
  });
});

/*
 分类删除
*/

router.get('/category/del',(req, res, next)=>{
  let categoryId = req.query.id || '';
  Category.findOne({
    _id: categoryId,
  }).then(category=>{
    //console.log(category);
    if(!category){
      responseData.code = -1;
      responseData.msg = '要删除的分类不存在';
      res.json(responseData);
      return;
    }else{
      Category.remove({
        _id: categoryId
      }).then(()=>{
        responseData.code = 1;
        responseData.msg = '删除成功';
        res.json(responseData);
        return;
      });
    }
  }).catch(err => console.log(err));
});

module.exports = router;
