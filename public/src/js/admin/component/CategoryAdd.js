import React,{ Component } from 'react';
import { Form, Input, Button, message } from 'antd';

const FormItem =  Form.Item;

class CategoryAddForm extends Component {
  constructor(props){
    super(props);
    this.addCategory = this.addCategory.bind(this);
  }
  addCategory(e){
    e.preventDefault();
    let categoryName = '';
    this.props.form.validateFields((err, values)=>{
      if(!err){
        categoryName = values.categoryName;
      }
    });
    fetch(`/admin/category/add?categoryName=${categoryName}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      credentials: 'include',
    }).then(response => response.json())
      .then( data => {
        //console.log(data);
        if(data.code === 2){
          message.success('添加成功');
        }else if( data.code === 1){
          message.warn('该分类已经存在');
        }else if(data.code === -1){
          message.error('请输入分类名称');
        }
      })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
     <div className="contentLayout">
        <Form layout="inline" onSubmit={(e) => this.addCategory(e)}>
          <FormItem>
            {
              getFieldDecorator('categoryName', {
                rules: [{required: true, message: '请输入分类名称'}],
              })(
                <Input placeholder="分类名称"/>
              )
            }
          </FormItem>
          <FormItem>
             <Button
                type="primary"
                htmlType="submit"
             >
                确定
             </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const CategoryAdd = Form.create()(CategoryAddForm);

export default CategoryAdd;
