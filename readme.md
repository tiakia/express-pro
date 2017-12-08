
#### 模块划分
  ##### 根据功能进行模块划分
          前台模块
          后台管理模块
          API模块
  使用app.use()进行模块划分

#### 前台路由＋模板
```
main模块  
  /      首页  
  /view  内容页  
api模块
  /                首页
  /register        用户注册
  /login           用户登录
  /comment         评论获取
  /comment/post    评论提交
```
#### 后台路由＋模板
```
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
```
Mongdb 使用 mongoose.Schema 创建表结构对象
使用 mongoos.model() 创建模型类用于对数据表的操作
```
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
```
这个 Tank 其实是一个构造函数，可以通过它建造对象进行表的操作
```
var small = new Tank({ size: 'small'});
small.save(function(err){
    if(err) return handleError(err);
    //saved
});
```

#### webpack
静态文件都放在 public 文件夹内，html文件放在 view 文件夹内  
路由使用 express 自带的路由  
水平有限，现在的做法就是先把 public 文件夹里面的静态资源打包然后引用给 views 文件夹里的html  

#### 使用fetch做post请求，数据获取问题
××前端××  
1.要注意请求头的设置,在请求时一定要规定请求数据格式时json格式的  
2.请求数据`JSON.stringify()`转化    
例子：
```
//数据 JSON 格式化
const data = JSON.stringify({
   username: this.state.userName,
   password: this.state.password,
   confirmPassword: this.state.confirmPassword
});
//设置请求头格式
fetch('/api/user/register',{
      method: "POST",
      mode: "cors",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: data
}).then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

××后端node××  
1.引入`body-parser`中间件  
```
const bodyParser = require('body-parser');
```
2.设置中间件
```
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
```
3.在请求的地方获取数据
```
app.post('/api/user/register',function(req, res, next){
    console.log(req.body);
});
```

#### webpack.config.js

在提取css文件的时候引入`antd`插件后自己用`sass`写的样式不存在了，只有打包后的`style.css`只有`antd`的样式存在，没有自己的。后来我把`sass`改成`less`打包后还是不行，实验了`css-modules`也行不通，最后查了一下`extract-text-plugin`通过这个打包生成多个`css`文件，而不是一个`style.css`然后结果就圆满了
### 后台模块
#### admin-slider 做成一个组件
#### content 做成一个组件
每个页面调用这俩个木块不同的是，不同的页面加载的`content`组件不一样
