import React,{ Component } from 'react';
import Main from './Main';
import Aside from './Aside';

const title = "欢迎光临我的博客，I'm from React";

export default class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : title,
      nav : [],
      content: [],
      pagination: {},
      activeItem: 'Home'
    };
    this.getContent = this.getContent.bind(this);
    this.handleGetCategory = this.handleGetCategory.bind(this);
  }
  componentWillMount(){
    this.getContent();
  }
  handleGetCategory(e){

    let category = e.target.innerHTML;
    fetch(`/nav?category=${category}`,{
      methdo: "GET",
      mode: 'cors',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(nav =>{
        //console.log(nav);
        let content = nav.data.content,
            pagination = nav.pagination;
        this.setState({
          content: content,
          pagination: pagination,
          activeItem: category
        });
      });
  }
  getContent(page=1){
    fetch(`/nav?page=${page}`,{
      methdo: "GET",
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
        //console.log(categories);
        this.setState({
          nav: categories,
          content: content,
          pagination: pagination
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
          <Main contentData={this.state.content}
                pagination={this.state.pagination}
                handleGetContent={this.getContent}
          />
          <Aside/>
        </div>
        </div>
    );
  }
}

class Header extends Component {
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

class Nav extends Component {
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
                   <a onClick={(e)=>this.props.getCategory(e)}
                      className={val.name === this.props.activeItem? 'active': null}
                      name={val._id}
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
