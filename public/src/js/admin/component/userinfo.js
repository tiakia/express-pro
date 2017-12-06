import React, { Component } from 'react';
import { Table } from 'antd';

const userInfoColumns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
},{
  title: '密码',
  dataIndex: 'password',
  key: 'password',
},{
  title: '注册日期',
  dataIndex: 'registerDay',
  key: 'registerDay',
},{
  title: '管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
}];


export default class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfoData: props.userInfoData,
      pagination: props.userInfoPage
    }
    this.mapUserInfo = this.mapUserInfo.bind(this);
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    const userInfo = nextProps.userInfoData,
          pagination = nextProps.userInfoPage;
    this.mapUserInfo(userInfo, pagination);
  }
  mapUserInfo(data,pagination){
    const dataSource = [];
    if(data){
       data.map((val, item)=>{
       dataSource.push({
          key: val._id.toString(),
          username: val.username,
          password: val.password,
          registerDay: val.registerDay,
          isAdmin: val.isAdmin ? "是" : "否"
       });
       this.setState({
          userInfoData: dataSource,
          pagination: pagination
       });
      });
    }
  }
  render(){
    return(
       <div style={{padding: 24, background: "#fff", height: "100vh"}}>
          <Table columns={userInfoColumns}
                 dataSource={this.state.userInfoData}
                 pagination={this.state.pagination}
                 onChange={pagination => this.props.handleGetUserInfo(pagination.current)}
          />

       </div>
    )
  }
}
