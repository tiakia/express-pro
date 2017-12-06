import React,{ Component } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem =  Form.Item;

class CategoryAddForm extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <Form layout="inline" onSubmit={(e) => this.props.handleAddCategory(e)}>
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
    )
  }
}

const CategoryAdd = Form.create()(CategoryAddForm);

export default CategoryAdd;
