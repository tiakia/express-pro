import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class AdminAside extends Component {
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
                 <Link className="nav-text" to="/userInfo">
                    <Icon type="user"/>
                    用户信息
                 </Link>
               </Menu.Item>
                <SubMenu key="category" title={<span><Icon type="appstore"/><span>分类</span></span>}>
                   <Menu.Item key="3">
                     <Link className="nav-text" to="/category">
                         <Icon type="switcher"/>
                         分类信息
                      </Link>
                   </Menu.Item>
                   <Menu.Item key="4">
                      <Link className="nav-text" to="/categoryAdd">
                         <Icon type="plus-square"/>
                         分类添加
                      </Link>
                   </Menu.Item>
               </SubMenu>
               <Menu.Item key="33">
                  <a className="nav-text">
                     <Icon type="upload"/>
                     nav 3
                  </a>
               </Menu.Item>
               <Menu.Item key="44">
                  <a className="nav-text">
                     <Icon type="user"/>
                    nav 4
                  </a>
               </Menu.Item>
            </Menu>
          </Sider>
    )
  }
}
