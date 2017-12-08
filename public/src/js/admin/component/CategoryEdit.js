import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input } from 'antd';

const FormItem = Form.Item;

class CategoryEditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryId: null,
      categoryName: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Fetch = this.Fetch.bind(this);
  }
  componentDidMount(){
    const categoryData = this.props.history.location.state.categoryData;
    console.log(categoryData);
    this.setState({
      categoryId: categoryData.id,
      categoryName: categoryData.categoryName
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if(!err){
        console.log(values);
      }
    });
  }
  Fetch(url){
    fetch(url,{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": 'application/json',
        "Content-type": 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data=>{
        console.log(data);
      });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div className="contentLayout">
          <h3>分类编辑 － {this.state.categoryName}</h3>
          <Form layout="inline" onSubmit={e => this.handleSubmit(e)}>
            <FormItem>
                {
                  getFieldDecorator('categoryName',{
                    rules:[{ required: true, message: '请输入修改后的分类名称'}]
                  })(
                    <Input type="text" placeholder="分类名称"/>
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
