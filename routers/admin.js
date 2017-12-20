var express = require('express');
var router = express.Router();
var queryString = require('queryString');
var User = require('./../models/User');
var Category = require('./../models/Categories');
var Content = require('./../models/Content');
//获取用户信息判断是否是管理员
router.use(function(req, res, next){
  try{
    //判断cookie中userInfo是否存在
    let userObj = req.signedCookies.userInfo && JSON.parse(req.signedCookies.userInfo);
    let responseData = {
      code: 0,
      msg: ''
    };
    //console.log(userObj);

    if(!userObj){
      //res.send("请重新<a href='/'>登录</a>");
      responseData.code = -1;
      responseData.msg = '请重新登录';
      //res.json(responseData);
      res.render('admin/error',{
        responseData: responseData
      });
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
  };
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
  }).then(categoryName=>{
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
      responseData.url = '/category';
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
  if(!id || !newName){
    responseData.code = -1;
    responseData.msg = '信息不完善，请重新填写';
    res.json(responseData);
    return;
  }
  Category.findOne({
    _id: id
  }).then(category=>{
    if(!category){
      responseData.code = -2;
      responseData.msg = '分类不存在，请重新操作';
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
      responseData.code = -3;
      responseData.msg = '数据库中已经有了该分类';
      res.json(responseData);
      return;
    }else{
      return Category.update({
        _id: id
      },{
        name: newName
      }).then(()=>{
         responseData.code = 1;
         responseData.msg = '修改成功';
         res.json(responseData);
         return;
     }).catch(err=>console.log(err));
    }
  }).catch(err=>console.log(err));
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
      }).catch(err=>console.log(err));
    }
  }).catch(err => console.log(err));
});


/*
 内容添加
*/

router.get('/content/add',(req,res)=>{
  Category.find().sort({_id: -1}).then(categories=>{
    if(!categories){
      responseData.code = -1;
      responseData.msg = '分类查找失败';
      res.json(resposneData);
      return;
    }
    responseData.options = categories;
    res.json(responseData);
    return;
  }).catch(err=>console.log(err));
});

/*
 内容保存
**/
router.post('/content/add',(req, res)=>{
  //console.log(req.body);
  let contentData = req.body || '',
      _categoryName = contentData.categoryName,
      title = contentData.title,
      shortDes = contentData.shortDes,
      _content = contentData.content,
      userObj = req.signedCookies.userInfo && JSON.parse(req.signedCookies.userInfo),
      userId = userObj.uid;
  if(!_categoryName || !title || !shortDes || !_content){
    responseData.code = -1;
    responseData.msg = '信息不完善，请重新填写！';
    res.json(responseData);
    return;
  }
  Category.findOne({
    name: _categoryName
  }).then(category=>{
    if(!category){
      responseData.code = -2;
      responseData.msg = '分类不存在';
      res.json(responseData);
      return;
    }
    Content.findOne({
      title: title,
      category: _categoryName
    }).then(content=>{
      if(content){
        responseData.code = -3;
        responseData.msg = '数据库中该分类下已经有了该标题的文章';
        res.json(responseData);
        return;
      }
      return new Content({
               category: _categoryName,
               title: title,
               user: userId,
               description: shortDes,
               content: _content
             }).save();
      }).then(content=>{
           if(content){
             responseData.code = 1;
             responseData.msg = '添加成功';
             res.json(responseData);
             return;
           }
         }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
});

/*
内容首页
**/
router.get('/content',(req, res)=>{
  let page = req.query.page || 1,
      limit = 10,
      skip = (page - 1) * 10;
  responseData.pagination.pageSize = limit;
  Content.count().then(totalCount=>{
    responseData.pagination.total = totalCount;
  }).catch(err=>console.log(err));
  Content.find().sort({_id: -1}).limit(limit).skip(skip).populate(['user']).then((content)=>{
    responseData.data = content;
    res.send(responseData);
  }).catch(err=>console.log(err));
});

/*
内容修改
**/
router.get('/content/edit',(req,res)=>{
  let id = req.query.id || '';
  Content.findOne({
    _id: id
  }).then(content=>{
    if(content){
      res.send(content);
    }
  }).catch(err=>console.log(err));
});
/*
内容修改保存
**/
router.post('/content/edit',(req, res)=>{
  let contentId = req.body.contentId || '',
      categoryName = req.body.categoryName || '',
      title = req.body.title || '',
      shortDes = req.body.shortDes || '',
      content = req.body.content || '';
  if(!categoryName || !title || !shortDes || !content || !contentId){
    responseData.code = -1;
    responseData.msg = '信息不完善，请重新填写！';
    res.json(responseData);
    return;
  }
  Content.findOne({
    _id: contentId
  }).then(contentData =>{
    if(!contentData){
      responseData.code = -2;
      responseData.msg = '文章不存在，请重新操作';
      res.json(responseData);
      return;
    }else{
      Category.findOne({
        name: categoryName
      }).then(_category =>{
        if(!_category){
          responseData.code = -3;
          responseData.msg = '分类不存在，请重新操作';
          res.json(responseData);
          return;
        }
        return Content.find({
          _id: {$ne: contentId},
          title: title,
          category: categoryName
        }).then(data=>{
          if(data.length != 0){
            responseData.code = -4;
            responseData.msg = '数据库中该分类下已经有了该标题的文章';
            res.json(responseData);
            return;
          }
          return Content.update({
              _id: contentId
           },{
              category: categoryName,
              title: title,
              content: content,
              description: shortDes
            }).then(()=>{
              responseData.code = 1;
              responseData.msg = '修改成功';
              res.json(responseData);
              return;
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err))
      }).catch(err=>console.log(err));
    }
  }).catch(err=>console.log(err));
});

/*
内容删除
 */
router.get('/content/del',(req,res)=>{
  let contentId = req.query.id || '';
  Content.findOne({
    _id: contentId
  }).then(content=>{
    if(!content){
      responseData.code = -1;
      responseData.msg = '要删除的文章不存在';
      res.json(responseData);
      return;
    }else{
      Content.remove({
        _id: contentId
      }).then(()=>{
        responseData.code = 1;
        responseData.msg = '删除成功';
        res.json(responseData);
        return;
      }).catch(err=>console.log(err));
    }
  }).catch(err=>console.log(err));
});

module.exports = router;
