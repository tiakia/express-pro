var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
let Category = require('./../models/Categories');
let Content = require('./../models/Content');
/*首页*/
router.get('/',function(req, res, next){
  //console.log(req);
  res.render('main/index');
});

router.use((req,res,next)=>{
  responseData = {
    code: 0,
    msg: '',
    data: null,
    pagination: {
      pageSize: 0,
      total: 0
    }
  }
  next();
})
/*首页*/
router.get('/nav',(req, res, next)=>{
  responseData.data = {
      categories: [],
      content: []
  };
  let page = req.query.page || 1,
      categoryName = req.query.category || '',
      limit = 10,
      skip = (page - 1) * 10;
  console.log(categoryName);
  Category.find().then(category=>{
    if(!category){
      responseData.code = -1;
      responseData.msg = '分类查找失败';
      res.json(responseData);
      return;
    }
    responseData.data.categories = category;
    if(categoryName.length !=0){
      return Content.count({"category":{"$in":categoryName}});
    }else{
      return Content.count();
    }
  }).then(count=>{
    if(!count){
      responseData.code = -2;
      responseData.msg = '数据总数查找失败';
      res.json(responseData);
      return;
    }
    responseData.pagination.total = count;
    responseData.pagination.pageSize = limit;
    let skip = (page - 1)* limit;
    if(categoryName.length != 0){
      return  Content.find({"category":{"$in":categoryName}}).sort({_id: -1}).limit(limit).skip(skip).populate(['user']).sort({addTime: -1});
    }else{
      return  Content.find().sort({_id: -1}).limit(limit).skip(skip).populate(['user']).sort({addTime: -1});
    }
  }).then((content)=>{
    if(!content){
      responseData.code = -3;
      responseData.msg = '文章查找失败';
      res.json(responseData);
      return;
    }
    responseData.data.content = content;
    res.json(responseData);
    return;
  }).catch(err=>console.log(err));
})

/*读取内容*/


module.exports = router;
