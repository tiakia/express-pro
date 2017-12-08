import React, { Component } from 'react';
import { render } from 'react-dom';
import UserInfo from './component/UserInfo';
import Category from './component/Category';
import CategoryAdd from './component/CategoryAdd';
import AdminAside from './component/AdminAside';
import AdminLayout from './component/Layout';
import "./../../css/admin.scss";

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo_data: null,
      userInfo_pagination: null,
      category_data: null,
      category_pagination: null
    }
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }
  componentDidMount(){
    this.getUserInfo();
  }
  getUserInfo(page = 1){
    fetch(`/admin/user?page=${page}`,{
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
          this.setState({
            userInfo_data: userInfoData.data,
            userInfo_pagination: userInfoData.pagination
          });
          //console.log(userInfoData.data);
        }
      })
  }
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
        //console.log(data);
        this.setState({
          category_data: categoryData.data,
          category_pagination: categoryData.pagination
        });
      })
  }
  render(){
    return(
        <div>
          <AdminLayout
            adminAside={<AdminAside/>}
            contentLayout={ <UserInfo
                               userInfoData={this.state.userInfo_data}
                               userInfoPage={this.state.userInfo_pagination}
                               handleGetUserInfo={this.getUserInfo}
                            />
                          }
          />
        </div>
    )
  }
}


render(
    <Admin/>,
  document.getElementById('admin')
);
