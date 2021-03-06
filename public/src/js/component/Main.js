import React,{ Component } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
var moment = require('moment');

export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      contentData: [],
      pagination: {pageSize: 10, total: 50},
      category: 'Home',
      errorMsg: ''
    };
    this.handleGetContent = this.handleGetContent.bind(this);
  }
  componentWillMount(){
    this.handleGetContent();
  }
  componentDidMount(){

  }
  handleGetContent(page=1){
    var _category = 'Home';
    if(this.props.history.location.state){
      _category = this.props.history.location.state.categoryName;
    }
    //console.log(this.props.history.location.state);
    fetch(`/main?page=${page}&category=${_category}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response=> response.json())
      .then(nav=>{
        //console.log(nav);
        let content = nav.data.content,
            pagination = nav.pagination,
            _errorMsg = '';
        if(nav.code < 0){
          _errorMsg = nav.msg
        }
        this.setState({
          contentData: content,
          pagination: pagination,
          category: _category,
          errorMsg: _errorMsg
        });
      });
  }
  render(){
    const pagination = this.state.pagination;
    return(
        <main className="left ">
        {
          this.state.errorMsg.length === 0 ?
            <div>
              <ItemList contentData={this.state.contentData}
                        error={this.state.errorMsg}
              />
              <div className="pagination right">
                <Pagination
                   defaultCurrent={1}
                   pageSize={pagination.pageSize}
                   total={pagination.total}
                   onChange={(page)=>this.handleGetContent(page)}
                 />
               </div>
            </div> : <article className='item failedContent'>{this.state.errorMsg}</article>
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
    const contentData = this.props.contentData;
    return(
        <div>
        {
            contentData.map((val,item)=>{
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
              : <Link
            to={{
              pathname: '/view',
              search: `?contentId=${this.props.contentId}`,
              state: {contentId: this.props.contentId},
            }}
              className="read-more"
              >
                   阅读更多
               </Link>
          }
        </article>
    )
  }
}
