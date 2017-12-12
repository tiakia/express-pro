import React,{ Component } from 'react';
import Main from './Main';
import Aside from './Aside';

const title = "欢迎光临我的博客，I'm from React";

export default class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : title,
      nav : []
    }
  }
  componentWillMount(){
    fetch('/nav',{
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
        nav.data.unshift({
          name: 'Home'
        });
        this.setState({
          nav: nav.data
        });
      });
  }
  render(){
    return(
        <div>
        <Header title={this.state.title}/>
        <Nav nav={this.state.nav}/>
        <div id="app" >
          <Main/>
          <Aside/>
        </div>
        </div>
    )
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
    )
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
                 return <li key={idx}><a href={"/"+val.name} >{val.name == "Home" ? "首页" : val.name}</a></li>
               })
             }
          </ul>
        </nav>
    )
  }
}
