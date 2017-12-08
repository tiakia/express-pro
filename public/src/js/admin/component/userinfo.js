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
      userInfoData: null,
      userInfoPagination: null
    }
    //this.mapUserInfo = this.mapUserInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  componentWillMount(){
    this.getUserInfo();
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    const userInfo = nextProps.userInfoData,
          pagination = nextProps.userInfoPage;
    //this.mapUserInfo(userInfo, pagination);
  }
  // mapUserInfo(data,pagination){
  //   const dataSource = [];
  //   if(data){
  //      data.map((val, item)=>{
  //      dataSource.push({
  //         key: val._id.toString(),
  //         username: val.username,
  //         password: val.password,
  //         registerDay: val.registerDay,
  //         isAdmin: val.isAdmin ? "是" : "否"
  //      });
  //      this.setState({
  //         userInfoData: dataSource,
  //         pagination: pagination
  //      });
  //     });
  //   }
  // }
  getUserInfo(page = 1){
    fetch(`/admin/userInfo?page=${page}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      credentials: 'include',
    }).then(response => response.json())
      .then( userInfoData => {
        if(userInfoData.code > 0){
          const dataSource = [];
          userInfoData.data.map((val, item)=>{
             dataSource.push({
               key: val._id.toString(),
               username: val.username,
               password: val.password,
               registerDay: val.registerDay,
               isAdmin: val.isAdmin ? "是" : "否"
             });
          });
          this.setState({
            userInfoData: dataSource,
            userInfoPagination: userInfoData.pagination
          });
          //console.log(userInfoData);
        }
      })
  }
  render(){
    return(
       <div className="contentLayout">
          <Table columns={userInfoColumns}
                 dataSource={this.state.userInfoData}
                 pagination={this.state.userInfoPagination}
                 onChange={pagination => this.getUserInfo(pagination.current)}
          />
       </div>
    )
  }
}
