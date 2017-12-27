/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Item } from './Main';
import { notification, Pagination } from 'antd';
var moment = require('moment');

export default class View extends Component {
  constructor(props){
    super(props);
    this.state = {
      contentData: [],//当前文章数据
      commentsArray: [],//所有评论数据
      commentVal: null,//读取评论数据
      userArray: [],//用户数组
      showContent: true,//显示文章内容函数阅读更多按钮
      currentPage: 1,//评论的当前页码
      pageSize: 5 //每页显示的数据条数
    };
    this.handleGetView = this.handleGetView.bind(this);
    this.handleCommentVal =  this.handleCommentVal.bind(this);
    this.handleCommentsSubmit = this.handleCommentsSubmit.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.handleGetView();
  }
  componentWillReceiveProps(nextProps){

  }
  handleGetView(){
    //console.log(location.search.split('?')[1].split("=")[1]);
    let contentId = location.search.split('?')[1].split("=")[1];
    fetch(`/views?contentId=${contentId}`,{
      method: 'GET',
      mode: 'cors',
      headers:{
        'Accept': 'application/json',
        "Content-type": 'application/json'
      },
      credentials: 'include'
    }).then(response=> response.json())
      .then(_data=>{
        //console.log(_data);
       var _viewsData = _data.data.content;
        this.setState({
           contentData: _viewsData,
           userArray: _viewsData.user,
           commentsArray: _viewsData.comments.reverse()
        });
      });
  }
  //评论提交
  handleCommentsSubmit(contentId){
     var _commentVal = this.state.commentVal;
      var _data = JSON.stringify({
                 contentId: contentId,
                 content: _commentVal
      });
      var newContent = [];
       fetch('/api/comment',{
        method: 'POST',
        mode: 'cors',
        headers: {
          "Accept": 'application/json',
          "Content-type": 'application/json'
        },
        credentials: 'include',
        body: _data
      }).then(response=>response.json())
        .then(data=>{
          if(data.code>0){
            notification['success']({
              message: data.msg
            });
            _commentVal = '';
            newContent = data.content.comments.reverse();
            //console.log(newContent);
            this.setState({
                commentVal: _commentVal,
                commentsArray: newContent
            });
          }else{
            notification['error']({
              message: data.msg
            });
          }
        });
  }
  //获取评论内容 onChange 事件
  handleCommentVal(e){
    let _commentVal = e.target.value;
    this.setState({
      commentVal: _commentVal
    });
  }
  renderComments(comments){//渲染评论的
    var perpage = this.state.pageSize,
        page = this.state.currentPage || 1,
        start = (page - 1)* perpage,
        end = start + perpage;
    return comments.map((val,item)=>{
      if(item >=start && item < end){
        //console.log(val);
        return(
          <div className="comment-item" key={item}>
            <p className="comment-item-top">
              <span className="comment-item-user">
                 {val.username}
              </span>
              <span className="comment-item-time">
               {
                  moment(val.postTime).format('YYYY-MM-D, HH:mm:ss a')
               }
              </span>
            </p>
            <div className="comment-item-data">
               {val.content}
            </div>
         </div>
        )
      }
    });
  }
  changePage(page){//处理页码变化的
    //console.log(page);
    this.setState({
      currentPage: page
    });
  }
  render(){
    const _content = this.state.contentData;
    return(
      <main className="left">
           <Item
               key={_content._id}
               title={_content.title}
               author={this.state.userArray.username}
               addTime={_content.addTime}
               views={_content.views}
               shortDes={_content.description}
               showContent={this.state.showContent}
               _contentData={_content.content}
               commentsNum={this.state.commentsArray.length}
            />
           <Comments
             commentsSubmit={this.handleCommentsSubmit}
             contentId={_content._id}
             commentChangeVal={this.handleCommentVal}
             commentData={this.state.commentData}
             commentsArray={this.state.commentsArray}
             renderComments={this.renderComments}
          />
          <div className='comments-page right'>
          <Pagination total={this.state.commentsArray.length}
                      pageSize={this.state.pageSize}
                      onChange={this.changePage}
                      current={this.state.currentPage}
          />
        </div>
      </main>
    )
  }
}


class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {}
    }
  }
  componentWillMount(){
    const userInfo = localStorage.getItem('userInfo'),
          userObj = JSON.parse(userInfo);
    if(userObj){
      this.setState({
         userInfo: userObj
      });
    }
  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    const contentId = this.props.contentId;
    return(
        <article className="item comment-model">
           <div className="comment-header">
             <strong>评论</strong>
             <span> 一共有 <i className="comment-count">{this.props.commentsArray.length}</i> 条 评论</span>
           </div>
           <div className="comment-center">
            {
              this.state.userInfo.username ?
                <div>
                {/* <span className="comment-user">{this.state.userInfo.username}</span> */}
                  <div className="comment-submit">
                  <textarea onChange={(e)=>this.props.commentChangeVal(e)}>

                  </textarea>
                    <button onClick={()=>this.props.commentsSubmit(contentId)}>提交</button>
                 </div>

                </div> :
                <p>你还没有登录，请先登录！</p>
             }
           </div>
           <div className="comment-footer">
           {
             this.props.commentsArray.length != 0 ?
              <div className="comment-data">
                 {
                   this.props.renderComments(this.props.commentsArray)
                 }

              </div> :
              <span className="no-comment">还没有留言</span>
           }
           </div>
        </article>
    )
  }
}
