import React,{ Component } from 'react';
import { Route, Link, BrowserRouter,Redirect } from 'react-router-dom';
import { notification } from 'antd';
import Main from './Main';
import Aside from './Aside';
import View from './View';

const title = "欢迎光临我的博客，I'm from React";

export default class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : title,
      nav : [],
      content: [],
      viewsData: [],//详情页数据
      pagination: {pageSize: 10, total: 50},
      activeItem: 'Home',//设置当前导航
      mode: 'success',//在正确和出错情况下切换 success  failed
      msg: '',//出错的提示信息
      showContent: true,//是否显示内容详情 true 显示 false 显示内容列表
      commentVal: {
        isEmpty: false,
        value: ''
      },  //评论内容
      commentsArray: []//所有评论
    };
    this.handleGetCategory = this.handleGetCategory.bind(this);
    this.handleGetView = this.handleGetView.bind(this);
    this.handleGetContent = this.handleGetContent.bind(this);
    this.handleCommentsSubmit = this.handleCommentsSubmit.bind(this);
    this.handleCommentVal = this.handleCommentVal.bind(this);
  }
  componentWillMount(){
    this.handleGetContent();
  }
  //点击分类获取该分类下的文章
  handleGetCategory(categoryName,categoryId){
    //console.log(categoryName,categoryId);
    fetch(`/main?category=${categoryName}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(nav =>{
        //console.log(nav);
        let mode = 'success',
            msg = '';
        if(nav.code < 0){
          mode = 'failed';
          msg = nav.msg;
        }
        let content = nav.data.content,
            pagination = nav.pagination;
        this.setState({
          content: content,
          pagination: pagination,
          activeItem: categoryName,
          mode : mode,
          msg: msg,
          showContent: true
        });
      });
  }
  //内容简介分页
  handleGetContent(page=1){
    fetch(`/main?page=${page}&category=${this.state.activeItem}`,{
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
        let categories = nav.data.categories,
            content = nav.data.content,
            pagination = nav.pagination;
        categories.unshift({
          _id: '',
          name: 'Home'
        });
        this.setState({
          nav: categories,
          content: content,
          pagination: pagination
        });
      });
  }
  //获取内容详情
  handleGetView(contentId){
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
        let  _viewsData = _data.data.content;
        this.setState({
           showContent: false,
           viewsData: _viewsData,
          commentsArray: _viewsData.comments.reverse()
        });
      });
  }
  //评论提交
  handleCommentsSubmit(contentId){
    let _commentVal = this.state.commentVal;
    if(_commentVal.value.length === 0){
      _commentVal.isEmpty = true;
    }else{
      var _data = JSON.stringify({
                 contentId: contentId,
                 content: _commentVal.value
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
            _commentVal.value = '';
            newContent = data.content.comments.reverse();
            // console.log(newContent);
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
    this.setState({
       commentVal: _commentVal,
    });
  }
  //获取评论内容
  handleCommentVal(e){
    let _commentVal = {
      isEmpty: false,
      value: e.target.value
    }
    this.setState({
      commentVal: _commentVal
    });
  }
  render(){
    return(
        <div>
        <Header title={this.state.title}/>
        <Nav nav={this.state.nav}
             getCategory={this.handleGetCategory}
             activeItem={this.state.activeItem}
        />
        <div id="app" >
        {this.state.showContent ?
             <Main contentData={this.state.content}
                   pagination={this.state.pagination}
                   getContent={this.handleGetContent}
                   getView={this.handleGetView}
                   mode={this.state.mode}
                   msg={this.state.msg}
                   viewsData={this.state.viewsData}
             /> :
             <View contentData={this.state.viewsData}
                   commentsSubmit={this.handleCommentsSubmit}
                   commentChangeVal={this.handleCommentVal}
                   commentData={this.state.commentVal}
                   commentsArray={this.state.commentsArray}
             />
        }
          <Aside/>
        </div>
        </div>
    );
  }
}

export class Header extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <header className="flex" >
          <h1>{this.props.title}</h1>
        </header>
    );
  }
}

export class Nav extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){

  }
  render(){
    return(
        <nav className="flex" >
          <ul className="flex" >
             {
               this.props.nav.map((val, idx) => {
                 return <li key={idx}>
                           <a onClick={()=>this.props.getCategory(val.name,val._id)}
                              className={val.name === this.props.activeItem? 'active': null}
                           >
                              {val.name == "Home" ? "首页" : val.name}
                          </a>
                        </li>;
               })
             }
          </ul>
        </nav>
    );
  }
}
