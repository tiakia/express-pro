/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Form, Button, Input, Select, notification } from 'antd';
import ContentForm from './ContentForm';

class ContentAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){

  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  handleSubmit(e,valiForm){
    e.preventDefault();
    valiForm.validateFields((err, values)=>{
      if(!err){
        const data = JSON.stringify(values);
        console.log(values);
        fetch('/admin/contentAdd',{
          method: 'POST',
          mode: 'cors',
          headers:{
            "Accept": 'application/json',
            "Content-type": "application/json"
          },
          credentials: 'include',
          body: data
        }).then(response => response.json())
          .then(data=>{
            if(data.code<0){//失败
                notification['error']({
                  message: data.msg
                });
            }else{
                notification['success']({
                  message: data.msg
                });
            }
          });
      }
    });
  }
  render(){
    return(
        <div>
          <ContentForm options={this.state.options}
                       handleSubmit={this.handleSubmit}
          />
        </div>
    );
  }
}


export default ContentAdd;
