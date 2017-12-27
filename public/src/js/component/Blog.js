import React,{ Component } from 'react';
import { Route, Link,NavLink, BrowserRouter,Redirect } from 'react-router-dom';
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
    };
    this.handleGetCategory = this.handleGetCategory.bind(this);
    this.handleActiveItem = this.handleActiveItem.bind(this);
  }
  componentWillMount(){
    this.handleGetCategory();
    if(!sessionStorage.getItem('activeItem')){
      sessionStorage.setItem('activeItem','Home');
    }
  }
  //点击分类获取该分类下的文章
  handleGetCategory(){
    fetch("/nav",{
      method: "GET",
      mode: 'cors',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(_nav =>{
        //console.log(_nav);return;
        let navData = _nav.data.categories;
        navData.unshift({
          _id: '',
          name: 'Home'
        });
        this.setState({
          nav: navData
        });
      });
  }
  handleActiveItem(e){
    //console.log(e.target.innerHTML);
    let current = e.target.innerHTML === '首页' ? 'Home' : e.target.innerHTML;
    sessionStorage.setItem('activeItem',current);
    let isContentId = location.search.split('?')[1].split('=')[0];
    console.log(isContentId);
    if(isContentId != 'contentId'){
     history.go(0);
    }
  }
  render(){
    return(
        <div>
        <Header title={this.state.title}/>
        <Nav nav={this.state.nav}
             handleActiveItem={this.handleActiveItem}
        />
        <div id="app" >
          {this.props.children}
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
                         <Link
                            to={{
                              pathname: '/main',
                              state:{ categoryName: val.name},
                              search: `?${val.name}`
                            }}
                            onClick={(e)=>this.props.handleActiveItem(e)}
                            className={sessionStorage.getItem('activeItem') === val.name ? 'active': null}
                         >
                              {val.name == "Home" ? "首页" : val.name}
                          </Link>
                        </li>;
               })
             }
          </ul>
        </nav>
    );
  }
}
