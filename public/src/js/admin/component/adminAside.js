import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class AdminAside extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUrl : '/userInfo'
    };
    this.handleSelectKey = this.handleSelectKey.bind(this);
  }
  componentWillMount(){
    let url = location.pathname,
        current = url.split('/admin')[1];
    //console.log(current.length);
    if(current.length == 0){
      current = '/userInfo';
    }else if(current =='/categoryEdit'){
      current = '/category';
    }else if(current === '/contentEdit'){
      current = '/content';
    }
    this.setState({
      currentUrl: current
    });
  }
  handleSelectKey(item,key,selectedKeys){
    //console.log(item.key);
    this.setState({
      currentUrl: item.key
    });
  }
  render(){
    return(
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo">
            </div>
             <Menu theme="dark"
                   mode="inline"
                   selectedKeys={[this.state.currentUrl]}
                   onSelect={this.handleSelectKey}
             >
               <Menu.Item key="/userInfo">
                 <Link className="nav-text" to="/userInfo">
                    <Icon type="user"/>
                    用户信息
                 </Link>
               </Menu.Item>
                <SubMenu key="category" title={<span><Icon type="appstore"/><span>分类</span></span>}>
                   <Menu.Item key="/category">
                     <Link className="nav-text" to="/category">
                         <Icon type="switcher"/>
                         分类信息
                      </Link>
                   </Menu.Item>
                   <Menu.Item key="/categoryAdd">
                      <Link className="nav-text" to="/categoryAdd">
                         <Icon type="plus-square"/>
                         分类添加
                      </Link>
                   </Menu.Item>
               </SubMenu>
                <SubMenu key="content" title={<span><Icon type="folder-open"/><span>内容管理</span></span>}>
                   <Menu.Item key="/content">
                     <Link className="nav-text" to="/content">
                         <Icon type="folder"/>
                         内容首页
                      </Link>
                   </Menu.Item>
                   <Menu.Item key="/contentAdd">
                      <Link className="nav-text" to="/contentAdd">
                         <Icon type="folder-add"/>
                         内容添加
                      </Link>
                   </Menu.Item>
               </SubMenu>
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
