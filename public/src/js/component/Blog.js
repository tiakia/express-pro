import React,{ Component } from 'react';
import Main from './Main';
import Aside from './Aside';
import Views from './View';

const title = "欢迎光临我的博客，I'm from React";

export default class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : title,
      nav : [],
      content: [],
      pagination: {pageSize: 10, total: 50},
      activeItem: 'Home',//设置当前导航
      mode: 'success',//在正确和出错情况下切换
      msg: '',//出错的提示信息
      showContent: false,
      viewsData: []
    };
    this.handleGetContent = this.handleGetContent.bind(this);
    this.handleGetCategory = this.handleGetCategory.bind(this);
    this.handleGetView = this.handleGetView.bind(this);
  }
  componentWillMount(){
    this.handleGetContent();
  }
  //点击分类获取该分类下的文章
  handleGetCategory(categoryName,categoryId){
    //console.log(categoryName,categoryId);
    fetch(`/nav?category=${categoryName}`,{
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
          showContent: false
        });
      });
  }
  //内容分页
  handleGetContent(page=1){

    fetch(`/nav?page=${page}&category=${this.state.activeItem}`,{
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
           showContent: true,
           viewsData: _viewsData
        });
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
        {
          this.state.mode === 'success' ?
             <Main contentData={this.state.content}
                   pagination={this.state.pagination}
                   getContent={this.handleGetContent}
                   getView={this.handleGetView}
                   showContent={this.state.showContent}
                   viewsData={this.state.viewsData}
            /> : this.state.mode === 'failed' ?
            <main className='failedContent left'>
              {this.state.msg}
            </main> : null
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
