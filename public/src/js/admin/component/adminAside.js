import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class AdminSlider extends Component {
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
                 <a className="nav-text" onClick={()=>this.props.handleChangeMode("userInfo")} >
                    <Icon type="user"/>
                    用户信息
                 </a>
               </Menu.Item>
                <SubMenu key="category" title={<span><Icon type="appstore"/><span>分类</span></span>}>
                   <Menu.Item key="3">
                     <a className="nav-text" onClick={()=>this.props.handleChangeMode("category")} >
                         <Icon type="switcher"/>
                         分类信息
                      </a>
                   </Menu.Item>
                   <Menu.Item key="4">
                      <a className="nav-text" onClick={()=>this.props.handleChangeMode("category_add")} >
                         <Icon type="plus-square"/>
                         分类添加
                      </a>
                   </Menu.Item>
                   <Menu.Item key="5">
                      <a className="nav-text" onClick={this.props.delCategory} >
                         <Icon type="delete"/>
                         分类删除
                      </a>
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
