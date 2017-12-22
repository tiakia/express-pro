/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';

export default class View extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  componentWillMount(){

  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    return(
      <main className="left">
        <article className='item'>
          <div className="title flex">
            <span></span>
          </div>
          <div className="article-info flex">
             <span>作者：</span>
             <span className="color create-author"></span>
             <span>时间：</span>
             <span className="color create-date"></span>
             <span>阅读：</span>
             <span className="color read-num"></span>
             <span>评论：</span>
             <span className="color comment-num">1</span>
          </div>
          <div className="summary">

          </div>

        </article>
      </main>
    )
  }
}
