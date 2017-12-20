import React, { Component } from 'react';
import { Layout, Breadcrumb, Menu, Dropdown, Avatar, Icon } from 'antd';
import AdminAside from './AdminAside';
import { Link, withRouter } from 'react-router-dom';

const {Header, Sider, Content, Footer } = Layout;

const breadcrumbNameMap = {
  '/userInfo': '用户信息',
  '/category': '分类',
  '/categoryAdd': '分类添加',
  '/categoryEdit': '分类编辑',
  '/categoryDel': '分类删除',
  '/content': '内容首页',
  '/contentAdd': '内容添加',
  '/contentEdit': '内容修改'
};

function Logout(){
  localStorage.removeItem('userInfo');
  let Cookies = document.cookie.split(';'),
      userInfo = null;
  Cookies.map((val,item)=>{
    if(val.indexOf('userInfo') === 0){
      userInfo = val.split('=');
    }
  });
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = userInfo[0]+"="+userInfo[1]+';expires='+exp.toGMTString();
  history.go(0);
}
const UserInfo = JSON.parse(localStorage.getItem('userInfo'));
const AvatarDrop = (
      <Menu>
        <Menu.Item key="0">
         用户名： {UserInfo.username}
        </Menu.Item>
        <Menu.Item key="1">
          注册日期：{UserInfo.date}
        </Menu.Item>
        <Menu.Item key="2">
           <a onClick={()=>Logout()}>退出</a>
        </Menu.Item>
      </Menu>
);

class AdminLayoutShowLocation extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeUrl : null
    };
  }
  componentWillMount(){

  }
  render(){
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <a href="/admin/userInfo">首页</a>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return(
        <Layout>
          <AdminAside/>
          <Layout>
            <Header className="headerLayout">
               <Dropdown overlay={AvatarDrop} trigger={['click']}>
                 <Avatar icon="user" style={{backgroundColor: '#87d068'}}/>
               </Dropdown>
            </Header>
            <Breadcrumb className="breadcrumb" >
                 {breadcrumbItems}
            </Breadcrumb>
            <Content className="contentContainer">
                {this.props.children}
            </Content>
            <Footer className="footerLayout">
              Extpress Blog @2017 Create by Tiankai
            </Footer>
          </Layout>
        </Layout>
    );
  }
}

const AdminLayout = withRouter(AdminLayoutShowLocation);

export default AdminLayout;
