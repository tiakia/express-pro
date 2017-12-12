import React, { Component } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

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
    const data = {id: record.categoryId, categoryName: record.categoryName};
    return(
      <span>
        <Link to={{
          pathname: '/categoryEdit',
          search: `?id=${record.categoryId}`,
          state: { categoryData: data }
        }} style={{marginRight: 5}}>修改</Link>
                <Popconfirm title="是否确定要删除？" onConfirm={()=>confirmDel(record.categoryId)} okText="是" cancelText="否">
          <a href="javascript:void(0);">删除</a>
        </Popconfirm>
      </span>
    )
  }
}];

function confirmDel(id){
  fetch(`/admin/category/del?id=${id}`,{
    method: 'GET',
    mode: 'cors',
    headers:{
      "Accept": 'application/json',
      "Content-type": 'application/json'
    },
    credentials: 'include'
  }).then(response => response.json())
    .then(data=>{
      if(data.code<0){
        message.error(data.msg);
      }else{
        message.success(data.msg);
        let timer = setTimeout(()=>{
          history.go(0);timer = null;
        },300);
      }
    });
}

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
          <Table columns={categoryColumns}
                 dataSource={this.state.categoryData}
                 pagination={this.state.categoryPagination}
                 onChange={pagination => this.getCategory(pagination.current)}
          />
       </div>
    )
  }
}
