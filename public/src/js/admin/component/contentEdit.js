/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, notification } from 'antd';
import ContentForm from './ContentForm';

const FormItem = Form.Item;

class ContentEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      contentData: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    const contentData = this.props.history.location.state.contentData;
    // _id: contentData.id
    fetch(`/admin/content/edit?id=${contentData.id}`,{
      method: 'GET',
      mode: 'cors',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data =>{
        //console.log(data);
        this.setState({
          contentData: data
        });
      });
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
        fetch('/admin/content/edit',{
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
               let timer = setTimeout(()=>{
                  history.go(-1);timer = null;
               },300);
            }
          });
      }
    });
  }
  render(){
    return(
        <div className="contentLayout">
          <ContentForm handleSubmit={this.handleSubmit}
                       contentVal={this.state.contentData}
          />
        </div>
    );
  }
}


export default ContentEdit;
