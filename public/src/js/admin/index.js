import React, { Component } from 'react';
import { render } from 'react-dom';
import { Layout } from 'antd';
import UserInfo from './component/userinfo';
import AdminSlider from './component/adminAside';
import Category from './component/category';
import CategoryAdd from './component/category_add';
import "./../../css/admin.scss";

const {Header, Sider, Content, Footer } = Layout;

class Admin extends Component{
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      mode: "userInfo",
      collapsed: false
    }
    this.changeMode = this.changeMode.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }
  componentDidMount(){
    this.getUserInfo();
  }
  changeMode(mode){
    this.setState({
      mode: mode
    });
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
      .then( data => {
        if(data.code > 0){
          this.setState({
            userInfo: data,
          });
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
      .then( data => {
        //console.log(data);
        this.setState({

        });
      })
  }
  addCategory(e){
    e.preventDefault();
    console.log(e.target);return;
    fetch(`/admin/category/add?categoryName=${e.target.value}`,{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      credentials: 'include',
    }).then(response => response.json())
      .then( data => {
        console.log(data);
        this.setState({

        });
      })
  }

  render(){
    return(
        <Layout>
          <AdminSlider
             handleChangeMode = {this.changeMode}
          />
          <Layout>
            <Header style={{ background: "#fff", padding: 0}}/>
            <Content style={{ margin: "24px 16px 0"}} >
              {
                this.state.mode === "userInfo" ?
                  <UserInfo
                     userInfoData={this.state.userInfo}
                     handleGetUserInfo={this.getUserInfo}
                  /> :
                this.state.mode === "category" ?
                  <Category
                     handleGetCategory={this.getCategory}
                  /> :
                this.state.mode === "category_add" ?
                  <CategoryAdd
                     handleAddCategory={this.addCategory}
                  /> : null
               }
            </Content>
            <Footer style={{ textAlign: 'center'}}>
              Extpress Blog @2017 Create by Tiankai
            </Footer>
          </Layout>
        </Layout>
    )
  }
}

render(
    <Admin/>,
  document.getElementById('admin')
);
