import React, { Component } from 'react';
import { Table } from 'antd';

const userInfoColumns = [{
  title: 'ID',
  dataIndex: 'category_id',
  key: 'category_id',
},{
  title: '分类名称',
  dataIndex: 'category_name',
  key: 'category_name',
},{
  title: '操作',
  dataIndex: 'doSomething',
  key: 'doSomething',
}];


export default class Category extends Component {
  constructor(props){
    super(props);
    this.state = {


    }

  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }

  render(){
    return(
       <div style={{padding: 24, background: "#fff", height: "100vh"}}>
         <span>category</span>
       </div>
    )
  }
}
