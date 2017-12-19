/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Form, Button, Input, Select, notification } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const option = Select.Option;

class ContentAddForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    fetch('/admin/contentAdd',{
      mode: 'cors',
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data=>{
        let options = data.options;
        let optionsDom = options.map((val,item)=>{
        return `<Select.Option key="${val._id}" value="${val._id}">${val.name}</Select.Option>`;
        });
        this.setState({
          //options: optionsDom
          options: data.options
        });
      });
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if(!err){
        const data = JSON.stringify(values);
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
    const { getFieldDecorator } = this.props.form;
    return(
        <div className="contentLayout">
          <Form onSubmit={e => this.handleSubmit(e)}>
              <FormItem
                  label="分类"
              >
                 {
                   getFieldDecorator('categoryName',{
                     rules:[
                       {
                         required: true,
                         message: '请选择一个分类'
                       }
                     ]
                   })(
                      <Select
                         placeholder="选择一个分类"
                         mode='combobox'
                         showSearch = {true}
                         filterOption={(input, option)=> option.props.children.toLowerCase().indexOf(input.toLowerCase())>=0}
                      >
                       {this.state.options.map(val => <Select.Option key={val.name}>{val.name}</Select.Option>)}
                      </Select>
                   )
                 }
               </FormItem>
               <FormItem
                 label="标题"
               >
                    {
                      getFieldDecorator('title',{
                        rules: [{
                          required: true,
                          message: '请输入标题'
                        }]
                      })(
                           <Input placeholder="请输入标题"/>
                      )
                    }
               </FormItem>
               <FormItem label="简介">
                    {
                      getFieldDecorator('shortDes',{
                        rules:[{
                          required: true,
                          message: '请输入简介'
                        }]
                      })(
                           <TextArea placeholder="请输入内容简介"/>
                      )
                    }

               </FormItem>
               <FormItem label="内容">
                    {
                      getFieldDecorator('content',{
                        rules:[{
                          required: true,
                          message: '请输入内容'
                        }]
                      })(
                          <TextArea placeholder="请输入内容" rows={10}/>
                      )
                    }

               </FormItem>
               <FormItem>
                   <Button type="primary" htmlType="submit">提交文章</Button>
               </FormItem>
           </Form>
        </div>
    );
  }
}

const ContentAdd = Form.create()(ContentAddForm);

export default ContentAdd;
