import React,{ Component } from 'react';

export default class Main extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <main className="left" >
          <ItemList/>
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
          <Item/>
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
             <span>NodeJs开发Web</span>
          </div>
          <div className="article-info flex">
             <span>作者：</span>
             <span className="color create-author">admin</span>
             <span>时间：</span>
             <span className="color create-date">2017年7月30日 14:34:20</span>
             <span>阅读：</span>
             <span className="color read-num">2</span>
             <span>评论：</span>
             <span className="color comment-num">1</span>
          </div>
          <div className="summary">
             Nodejs开发web第一课
          </div>
          <button className="read-more">阅读更多</button>
        </article>
    )
  }
}
