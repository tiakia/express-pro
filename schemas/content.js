var mongoose = require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({
  //关联字段 - 分类名
  category:{
    //类型
    type: mongoose.Schema.Types.String,
    //引用c
    ref: 'Category'
  },
  //内容标题
  title: String,
  //简介
  description:{
    type: String,
    default: ''
  },
  //内容
  content:{
    type: String,
    default: ''
  }
});
