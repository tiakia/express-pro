//应用程序入口文件
/*
模块划分
  根据功能进行模块划分
          前台模块
          后台管理模块
          API模块
  使用app.use()进行模块划分

前台路由＋模板
main模块
  /      首页
  /view  内容页
api模块
  /                首页
  /register        用户注册
  /login           用户登录
  /comment         评论获取
  /comment/post    评论提交

后台路由＋模板
admin模块
     /                首页
  用户管理
     /user            用户列表
  分类管理
    /category         分类列表
    /catetory/add     分类添加
    /category/edit    分类修改
    /catetory/delete  分类删除
  文章内容管理
    /article          内容列表
    /article/add      内容添加
    /article/edit     内容修改
    /article/delete   内容删除
  评论内容管理
    /comment          评论列表
    /comment/delete   评论删除
*/

var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

//设置静态文件托管 html css image
// 当用户访问的url以/public开始，直接返回对应的__dirname + '/public'下的文件

app.use('/public', express.static(__dirname + '/public/'));

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数： 模板引擎的名称，同时也是模板文件的后缀
// 第二个参数： 用于解析模板内容的方法

app.engine('html', swig.renderFile);

// 设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录

app.set('views','./views');

//注册所使用的模板引擎， 第一个参数必须是 view engine,第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的

app.set('view engine', 'html');

// 在开发过程中取消模板缓冲

swig.setDefaults({cache: false});

//bodyParser 设置
app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

//cookie设置
app.use(cookieParser());
// app.use(session({
//   'secret': 'tiankai',
//   'cookie': {
//     'httpOnly': false,
//     'maxAge': 900000000,
//   },
//   'resave': false,
//   'saveUninitialized': true
// }));

// 划分模块

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connection.openUri('mongodb://localhost:27018/blog',function(err){
  if(err){
    console.log('数据库连接失败');
  }else{
    console.log('数据库连接成功');
    app.listen(8080);
  }
});


/**
用户发送http请求－》 url －》 解析路由 －》 找到匹配规则 －》 执行指定的绑定函数，返回对应内容至用户

/public －》 静态 －》 直接读取指定目录下的文件，返回给用户

动态 －》 处理业务逻辑，加载模板，解析模板 －》 返回数据给用户
*/
