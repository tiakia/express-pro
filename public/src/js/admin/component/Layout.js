import React, { Component } from 'react';
import { Layout } from 'antd';
import AdminAside from './AdminAside';

const {Header, Sider, Content, Footer } = Layout;

export default class AdminLayout extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <Layout>
          <AdminAside/>
          <Layout>
            <Header style={{ background: "#fff", padding: 0}}>
                {this.props.header}
            </Header>
            <Content style={{ margin: "24px 16px 0"}} >
                {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center'}}>
              Extpress Blog @2017 Create by Tiankai
            </Footer>
          </Layout>
        </Layout>
    )
  }
}
