import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, message } from 'antd';

const FormItem = Form.Item;

class CategoryEditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryId: null,
      categoryName: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const categoryData = this.props.history.location.state.categoryData;
    //console.log(categoryData);
    this.setState({
      categoryId: categoryData.id,
      categoryName: categoryData.categoryName
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      const data = JSON.stringify({
        categoryId: this.state.categoryId,
        categoryName: values.categoryName
      });
      if(!err){
        fetch('/admin/category/edit',{
          method: "POST",
          mode: 'cors',
          headers:{
            "Accept": 'application/json',
            "Content-type": 'application/json'
          },
          credentials: 'include',
          body: data
         }).then(response => response.json())
           .then(data=>{
             if(data.code<0){
               message.warn(data.msg);
             }else{//success
               message.success(data.msg);
               history.go(-1);
             }
            });
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div className="contentLayout">
        <h4 style={{marginBottom: 15}}>分类名称 － {this.state.categoryName}</h4>
          <Form layout="inline" onSubmit={e => this.handleSubmit(e)}>
            <FormItem>
                {
                  getFieldDecorator('categoryName',{
                    rules:[{ required: true, message: '请输入修改后的分类名称'}]
                  })(
                    <Input type="text" placeholder="新分类名称"/>
                  )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
               >
                 确认修改
               </Button>
            </FormItem>
          </Form>
        </div>
    )
  }
}

const CategoryEdit = Form.create()(CategoryEditForm);

export default CategoryEdit;
