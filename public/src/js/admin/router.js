import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import AdminLayout from './component/Layout';
import UserInfo from './component/UserInfo';
import Category from './component/Category';
import CategoryAdd from './component/CategoryAdd';
import "./../../css/admin.scss";

render((
    <BrowserRouter basename="/admin">
    <AdminLayout>
       <Route exact path="/" component={UserInfo}/>
       <Route exact path="/userInfo" component={UserInfo}/>
       <Route path="/category" component={Category}/>
       <Route path="/categoryAdd" component={CategoryAdd}/>
    </AdminLayout>
    </BrowserRouter>
),document.getElementById('admin'));
