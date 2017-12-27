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
        <main className="left ">
        {
          this.props.mode === 'failed' ?
            <p className='failedContent'>
              {this.props.msg}
            </p> : this.props.mode === 'success' ?
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
            </div> : <span>Error</span>
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
                       addTime={val.addTime}
                       views={val.views}
                       shortDes={val.description}
                       contentId={val._id}
                       getView={this.props.getView}
                       showContent={false}
                       commentsNum={val.comments.length}
                    />
          })
        }
        </div>
    )
  }
}

export class Item extends Component {
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
             <span className="color create-date">{moment(this.props.addTime).format('YYYY-MM-D, HH:mm:ss a')}</span>
             <span>阅读：</span>
             <span className="color read-num">{this.props.views}</span>
             <span>评论：</span>
             <span className="color comment-num">{this.props.commentsNum}</span>
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
