/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Item } from './Main';
var moment = require('moment');

export default class View extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  componentWillMount(){

  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    const _content = this.props.contentData;
    //console.log(_content);
    return(
      <main className="left">
           <Item
               key={_content._id}
               title={_content.title}
               author={_content.user.username}
               addTime={_content.addTime}
               views={_content.views}
               shortDes={_content.description}
               showContent={true}
               _contentData={_content.content}
               commentsNum={this.props.commentsArray.length}
            />
           <Comments
             commentsSubmit={this.props.commentsSubmit}
             contentId={_content._id}
             commentChangeVal={this.props.commentChangeVal}
             commentData={this.props.commentData}
             commentsArray={this.props.commentsArray}
           />
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
                {
                  this.props.commentData.isEmpty ?
                    <p>请重新输入评论内容</p> :
                    null
                }
                </div> :
                <p>你还没有登录，请先登录！</p>
             }
           </div>
           <div className="comment-footer">
           {
             this.props.commentsArray.length != 0 ?
              <div className="comment-data">
                 {
                     this.props.commentsArray.map((val,item)=>{
                         return   <div className="comment-item" key={item}>
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
                     })
                 }
              </div> :
              <span className="no-comment">还没有留言</span>
           }
           </div>
        </article>
    )
  }
}
