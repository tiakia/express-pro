import React,{ Component } from 'react';

const title = "欢迎光临我的博客，I'm from REACT";

const nav = [
  {link: '/', text: "首页"},
  {link: '/', text: "HTML5"},
  {link: '/', text: "CSS"},
  {link: '/', text: "JAVASCRIPT"},
  {link: '/', text: "JAVA"},
  {link: '/', text: "PHP"},
  {link: '/', text: "EXPRESS"},
  {link: '/', text: "NODE"}
];

export default class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : title,
      nav : nav
    }
  }
  render(){
    return(
        <div>
        <Header title={this.state.title}/>
        <Nav nav={this.state.nav}/>
        </div>
    )
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
    )
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
                 return <li key={val}><a href={val.link} >{val.text}</a></li>
               })
             }
          </ul>
        </nav>
    )
  }
}
