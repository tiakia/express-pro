/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Form, Button, Input, Select, notification } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class ContentLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: [],
      contentData: props.contentVal
    };
  }
  componentWillMount(){
   fetch('/admin/content/add',{
      mode: 'cors',
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data=>{
        this.setState({
          options: data.options
        });
      });
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div className="contentLayout">
           <Form onSubmit={e => this.props.handleSubmit(e,this.props.form)}>
        {
          this.props.contentVal ?
               <FormItem>
                    {
                      getFieldDecorator('contentId',{
                        initialValue: this.props.contentVal._id
                      })(
                          <Input disabled={true}/>
                      )
                    }
               </FormItem>
            : <FormItem>

              </FormItem>
        }
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
                     ],
                     initialValue: this.props.contentVal ? this.props.contentVal.category : ''
                   })(
                      <Select
                         placeholder="选择一个分类"
                         mode='combobox'
                         showSearch = {true}
                         filterOption={(input, option)=> option.props.children.toLowerCase().indexOf(input.toLowerCase())>=0}
                      >
                       {
                         this.state.options.map(val => <Select.Option key={val.name}>{val.name}</Select.Option>)
                       }
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
                          message: '请输入标题',
                        }],
                        initialValue: this.props.contentVal ? this.props.contentVal.title : ''
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
                        }],
                        initialValue: this.props.contentVal ? this.props.contentVal.description : ''
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
                        }],
                        initialValue: this.props.contentVal ? this.props.contentVal.content : ''
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

const ContentForm = Form.create()(ContentLayout);

export default ContentForm;
