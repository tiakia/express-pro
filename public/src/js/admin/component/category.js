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
      categoryData: null,
      categoryPagination: null,
    }
    //this.mapCategory = this.mapCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }
  componentWillMount(){
    this.getCategory();
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    //this.mapCategory(nextProps.categoryData, nextProps.categoryPage);
  }
  // mapCategory(data, pagination){
  //   const dataSource = [];
  //   if(data){
  //     data.map((val, item)=>{
  //       dataSource.push({
  //         key: val._id.toString(),
  //         categoryId: val._id.toString(),
  //         categoryName: val.name
  //       });
  //     });
  //     this.setState({
  //       categoryData: dataSource,
  //       pagination: pagination
  //     });
  //   }
  // }
  getCategory(page = 1){
    fetch(`/admin/category?page=${page}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      credentials: 'include',
    }).then(response => response.json())
      .then( categoryData => {
        //console.log(categoryData);
        const dataSource = [];
        categoryData.data.map((val, item)=>{
          dataSource.push({
            key: val._id.toString(),
            categoryId: val._id.toString(),
            categoryName: val.name
          });
        });
        this.setState({
          categoryData: dataSource,
          categoryPagination: categoryData.pagination
        });
      })
  }
  render(){
    return(
       <div className="contentLayout">
          <span>category</span>
          <Table columns={categoryColumns}
                 dataSource={this.state.categoryData}
                 pagination={this.state.categoryPagination}
                 onChange={pagination => this.getCategory(pagination.current)}
          />
       </div>
    )
  }
}
