import React,{ Component } from 'react';
import { Pagination } from 'antd';
var moment = require('moment');

export default class Main extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <main className="left" >
          <ItemList contentData={this.props.contentData}/>
          <div className="pagination right">
             <Pagination total={this.props.pagination.total}
                      pageSizeOptions={['"'+this.props.pagination.pageSize+'"']}
                      onChange={(page)=>this.props.handleGetContent(page)}
             />
          </div>
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
                       addTime={moment(val.addTime).format('YYYY-MM-D, HH:mm:ss a'),moment(val.addTime).format('YYYY-MM-D, HH:mm:ss')}
                       views={val.views}
                       shortDes={val.description}
                    />
          })
        }
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
          <button className="read-more">阅读更多</button>
        </article>
    )
  }
}
