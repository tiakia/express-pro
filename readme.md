
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
