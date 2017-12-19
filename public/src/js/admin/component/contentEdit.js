/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, message } from 'antd';
import ContentForm from './ContentForm';

const FormItem = Form.Item;

class ContentEditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      contentId: null,
      options: []
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
        console.log(data);
      });
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  handleSubmit(e){
    e.preventDefault();
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div className="contentLayout">
          <ContentForm options={this.state.options}
                       handleSubmit={this.handleSubmit}
          />
        </div>
    );
  }
}

const ContentEdit = Form.create()(ContentEditForm);

export default ContentEdit;
