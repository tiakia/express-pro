import React, { Component } from 'react';
import { Route, Link, BrowserRouter,Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import AdminLayout from './component/Layout';
import UserInfo from './component/UserInfo';
import Category from './component/Category';
import CategoryAdd from './component/CategoryAdd';
import CategoryEdit from './component/CategoryEdit';
import ContentAdd from './component/ContentAdd';
import Content from './component/Content';
import ContentEdit from './component/ContentEdit';
import "./../../css/admin.scss";

render((
    <BrowserRouter basename="/admin" forceRefresh={false}>
      <AdminLayout >
         <Route exact path="/" component={UserInfo}/>
         <Route path="/userInfo" component={UserInfo}/>
         <Route path="/category" component={Category}/>
         <Route path="/categoryAdd" component={CategoryAdd}/>
         <Route path="/categoryEdit" component={CategoryEdit}/>
         <Route path="/contentAdd" component={ContentAdd}/>
         <Route path="/content" component={Content}/>
         <Route path="/contentEdit" component={ContentEdit}/>
      </AdminLayout>
    </BrowserRouter>
),document.getElementById('admin'));
