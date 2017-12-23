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

/*读取通用数据*/
router.use((req,res,next)=>{
  responseData.data = {
      categories: [],
      content: []
  };
  Category.find().then(category=>{
    if(!category){
      responseData.code = -1;
      responseData.msg = '分类查找失败';
      res.json(responseData);
      return;
    }
    responseData.data.categories = category;
  });
  next();
});

/*首页*/
router.get('/main',(req, res, next)=>{

  let page = req.query.page || 1,
      categoryName = req.query.category === 'Home' ? '' : req.query.category,
      limit = 2,
      skip = (page - 1) * limit,
      where = categoryName.length != 0 ? {"category":{"$in":categoryName}} : '';
  Content.count(where).then(count=>{
    if(!count){
      responseData.code = -2;
      responseData.msg = '数据总数查找失败 或 没有查找到相关数据';
      res.json(responseData);
      return;
    }
    responseData.pagination.total = count;
    responseData.pagination.pageSize = limit;
    Content.find(where).limit(limit).skip(skip).populate(['user']).sort({addTime: -1})
     .then((content)=>{
        if(!content){
          responseData.code = -3;
          responseData.msg = '文章查找失败 或 没有查找到相关数据';
          res.json(responseData);
          return;
        }
        responseData.data.content = content;
        res.json(responseData);
        return;
     }).catch(err=>console.log(err));
  }).catch(err=>console.log(err));
});

/*读取内容*/
router.get('/views',(req,res)=>{
  let contentId = req.query.contentId || '';
  if(contentId.length == 0){
    responseData.code = -1;
    responseData.msg = '请重试';
    res.json(responseData);
    return;
  }
  Content.findOne({
    _id: contentId
  }).populate(['user']).then(contentData=>{
    //console.log(contentData);
    contentData.views++;
    contentData.save();

    responseData.code = 1;
    responseData.msg = '获取详情成功';
    responseData.data.content = contentData;
    res.json(responseData);
    return;
  }).catch(err=>console.log(err))
});

module.exports = router;
