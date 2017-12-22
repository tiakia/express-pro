import React,{ Component } from 'react';
import { Pagination } from 'antd';
var moment = require('moment');

export default class Main extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const pagination = this.props.pagination;
    return(
        <main className="left" >
        {
          this.props.showContent ?
          <Views
             contentData={this.props.viewsData}
             showContent={this.props.showContent}
          />:
          <div>
              <ItemList contentData={this.props.contentData}
                    getView={this.props.getView}
              />
              <div className="pagination right">
                <Pagination
                   defaultCurrent={1}
                   pageSize={pagination.pageSize}
                   total={pagination.total}
                   onChange={(page)=>this.props.getContent(page)}
                 />
               </div>
           </div>
        }
        </main>
    )
  }
}

class ItemList extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div>
        {
          this.props.contentData.map((val,item)=>{
            return  <Item
                       key={item}
                       title={val.title}
                       author={val.user.username}
                       addTime={moment(val.addTime).format('YYYY-MM-D, HH:mm:ss a')}
                       views={val.views}
                       shortDes={val.description}
                       contentId={val._id}
                       getView={this.props.getView}
                    />
          })
        }
        </div>
    )
  }
}

class Views extends Component {
  constructor(props){
     super(props);
  }
  render(){
    const _content = this.props.contentData;
    return(
      <div>
           <Item
               key={_content._id}
               title={_content.title}
               author={_content.user.username}
               addTime={moment(_content.addTime).format('YYYY-MM-D, HH:mm:ss a')}
               views={_content.views}
               shortDes={_content.description}
               showContent={this.props.showContent}
               _contentData={_content.content}
            />
           <Comments/>
      </div>
    )
  }
}

class Item extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <article className='item'>
          <div className="title flex">
            <span>{this.props.title}</span>
          </div>
          <div className="article-info flex">
             <span>作者：</span>
             <span className="color create-author">{this.props.author}</span>
             <span>时间：</span>
             <span className="color create-date">{this.props.addTime}</span>
             <span>阅读：</span>
             <span className="color read-num">{this.props.views}</span>
             <span>评论：</span>
             <span className="color comment-num">1</span>
          </div>
          <div className="summary">
             {this.props.shortDes}
          </div>
          {
           this.props.showContent ?
              <div>
                 {this.props._contentData}
              </div>
           : <ReadMoreBtn getView={this.props.getView}
                       contentId={this.props.contentId}
             />
          }
        </article>
    )
  }
}

class ReadMoreBtn extends Component {
  render(){
    return(
        <button onClick={()=>this.props.getView(this.props.contentId)}
                className="read-more"
                value={this.props.contentId}
        >
          阅读更多
        </button>
    )
  }
}

class Comments extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <article className="item comment-model">
           <div className="comment-header">
             <strong>评论</strong>
             <span> 一共有 <i className="comment-count">0</i> 条 评论</span>
           </div>
           <div className="comment-center">
              <span className="comment-user">admin</span>
              <div className="comment-submit">
                  <input palceholder="请输入评论内容" />
                  <button>提交</button>
              </div>
              <p>你还没有登录，请先登录！</p>
           </div>
           <div className="comment-footer">
              <span className="no-comment">还没有留言</span>
              <div className="comment-data">
                  <div className="comment-item">
                    <p className="comment-item-top">
                       <span className="comment-item-user">admin</span>
                       <span className="comment-item-time">2107-12-22 17:29:00</span>
                    </p>
                    <div className="comment-item-data">放到分解登录是</div>
                  </div>
              </div>
           </div>
        </article>
    )
  }
}
