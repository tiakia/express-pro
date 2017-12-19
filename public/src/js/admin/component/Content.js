/*
  Author: tiankai
  Github: https://github.com/tiakia
  Email: tiankai0426@sina.com
*/

import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const contentColumns = [{
  title: 'ID',
  dataIndex: 'contentId',
  key: 'contentId'
},{
  title: '文章标题',
  dataIndex: 'contentTitle',
  key: 'contentTitle'
},{
  title: '分类',
  dataIndex: 'contentCat',
  key: 'contentCat'
},{
  title: '摘要',
  dataIndex: 'shortDes',
  key: 'shortDes'
},{
  title: '操作',
  dataIndex: '',
  key: 'doSomething',
  render: (record)=>{
    const data = {id: record.contentId};
    return(
      <span>
        <Link to={{
          pathname: '/contentEdit',
          state: { contentData: data}
        }} style={{marginRight: 5}}>修改</Link>
        <Popconfirm title="是否确定要删除？" onConfirm={()=>confirmDel(record.contentId)} okText="是" cancelText="否">
          <a href="javascript:void(0);">删除</a>
        </Popconfirm>
      </span>
    );
  }
}];

function confirmDel(id){
  fetch(`/admin/content/del?id=${id}`,{
    method: 'GET',
    mode: 'cors',
    headers:{
      "Accept": 'application/json',
      "Content-type": 'application/json'
    },
    credentials: 'include'
  }).then(response => response.json())
    .then(data=>{
      console.log(data);return;
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

export default class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      contentData: null,
      contentPagination: null
    };
    this.getContent = this.getContent.bind(this);
  }
  componentWillMount(){
    this.getContent();
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  getContent(page=1){
    fetch(`/admin/content?page=${page}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": 'application/json',
        "Content-type": 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
      .then( contentData => {
        const dataSource = [];
        //console.log(contentData);
        contentData.data.map((val, item)=>{
          dataSource.push({
            key: val._id.toString(),
            contentId: val._id.toString(),
            contentTitle: val.title,
            contentCat: val.category,
            shortDes: val.description
          });
        });
        this.setState({
          contentData: dataSource,
          contentPagination: contentData.pagination
        });

      });
  }
  render(){
    return(
       <div className="contentLayout">
          <Table columns={contentColumns}
                 dataSource={this.state.contentData}
                 pagination={this.state.contentPagination}
                 onChange={pagination => this.getContent(pagination.current)}
          />
       </div>

    );
  }
}
