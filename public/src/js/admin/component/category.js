import React, { Component } from 'react';
import { Table, Divider } from 'antd';

const categoryColumns = [{
  title: 'ID',
  dataIndex: 'categoryId',
  key: 'categoryId',
},{
  title: '分类名称',
  dataIndex: 'categoryName',
  key: 'categoryName',
},{
  title: '操作',
  dataIndex: '',
  key: 'doSomething',
  render: (record)=>{
    return(
      <span>
        <a href={"/admin/category/edit?id="+record.categoryId} style={{marginRight: 5}}>修改</a>

        <a href={'/admin/category/del?id='+record.categoryId}>删除</a>
      </span>
    )
  }
}];



export default class Category extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryData: props.categoryData,
      pagination: props.categoryPage
    }
    this.mapCategory = this.mapCategory.bind(this);
  }
  componentDidMount(){
    this.props.handleGetCategory();
  }
  componentWillReceiveProps(nextProps){
    this.mapCategory(nextProps.categoryData, nextProps.categoryPage);
  }
  mapCategory(data, pagination){
    const dataSource = [];
    if(data){
      data.map((val, item)=>{
        dataSource.push({
          key: val._id.toString(),
          categoryId: val._id.toString(),
          categoryName: val.name
        });
      });
      this.setState({
        categoryData: dataSource,
        pagination: pagination
      });
    }
  }
  render(){
    return(
       <div style={{padding: 24, background: "#fff", height: "100vh"}}>
          <span>category</span>
          <Table columns={categoryColumns}
                 dataSource={this.state.categoryData}
                 pagination={this.state.pagination}
                 onChange={pagination => this.props.handleGetCategory(pagination.current)}
          />
       </div>
    )
  }
}
