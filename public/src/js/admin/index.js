import React, { Component } from 'react';
import { render } from 'react-dom';
import { Layout, Menu, Icon, Table } from 'antd';
import "./../../css/admin.scss";

const {Header, Sider, Content, Footer } = Layout;


class Admin extends Component{
  constructor(props){
    super(props);
    this.state = {
      userInfo: undefined,
      mode: "",
      collapsed: false
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  componentDidMount(){
    this.getUserInfo();
  }
  getUserInfo(){
    fetch('/admin/user',{
      method: "GET",
      mode: 'cors',
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      credentials: 'include'
    }).then(response => response.json())
      .then( data => {
        console.log(data);
        this.setState({
          userInfo: data,
          mode: 'userInfo'
        });
      })
  }
  render(){
    return(
        <Layout>
          <AdminSlider
             getUserInfo = {this.getUserInfo}
          />
          <Layout>
            <Header style={{ background: "#fff", padding: 0}}/>
            <Content style={{ margin: "24px 16px 0"}} >
              {
                this.state.mode === "userInfo" ?
                  <UserInfo userInfoData={this.state.userInfo}/>
                : <h1>content</h1>
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

class AdminSlider extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo">
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
               <Menu.Item key="1">
                 <a className="nav-text" onClick={this.props.getUserInfo} >
                    <Icon type="user"/>
                    用户信息
                 </a>
               </Menu.Item>
               <Menu.Item key="2">
                 <a className="nav-text">
                   <Icon type="video-camera"/>
                   nav 2
                 </a>
               </Menu.Item>
               <Menu.Item key="3">
                  <a className="nav-text">
                     <Icon type="upload"/>
                     nav 3
                  </a>
               </Menu.Item>
               <Menu.Item key="4">
                  <a className="nav-text">
                     <Icon type="user"/>
                    用户信息
                  </a>
               </Menu.Item>
            </Menu>
          </Sider>
    )
  }
}

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

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.renderUserInfo = this.renderUserInfo.bind(this);
  }
  renderUserInfo(val, item){
    return(
        <Row gutter={16} key={val._id}>
           <Col className="gutter-row" span={6}>
             <div className="gutter-box">{val.username}</div>
           </Col>
           <Col className="gutter-row" span={6}>
             <div className="gutter-box">{val.password}</div>
           </Col>
           <Col className="gutter-row" span={6}>
             <div className="gutter-box">{val.registerDay}</div>
           </Col>
           <Col className="gutter-row" span={6}>
             <div className="gutter-box">{val.isAdmin ? "是" : "否"}</div>
          </Col>
        </Row>
     )
  }
  render(){
    return(
              <div style={{padding: 24, background: "#fff", height: "100vh"}}>
                 <Row gutter={16} className="table-header">
                     <Col className="gutter-row" span={6}>
                        <div className="gutter-box">用户名</div>
                     </Col>
                     <Col className="gutter-row" span={6}>
                        <div className="gutter-box">密码</div>
                     </Col>
                     <Col className="gutter-row" span={6}>
                        <div className="gutter-box">注册日期</div>
                     </Col>
                     <Col className="gutter-row" span={6}>
                        <div className="gutter-box">管理员</div>
                     </Col>
                 </Row>
        {
          this.props.userInfoData != undefined ?
            this.props.userInfoData.map((val,item)=>this.renderUserInfo(val,item))
            : null
        }
              </div>
    )
  }
}

render(
    <Admin/>,
  document.getElementById('admin')
);
