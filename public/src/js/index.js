import React,{ Component } from 'react';
import { Route, Link, BrowserRouter,Redirect } from 'react-router-dom';
import {render} from 'react-dom';
import './../css/reset.scss';
import './../css/main.scss';
import Blog,{ Header, Nav } from './component/Blog';
import View from './component/View';
import Main from './component/Main';
import Aside from './component/Aside';

let rootElement = document.getElementById('root');
var navData = [];
fetch("/nav",{
   method: "GET",
   mode: 'cors',
   headers:{
     'Accept': 'application/json',
     'Content-type': 'application/json'
   },
    credentials: 'include'
}).then(response => response.json())
.then(_nav =>{
    //console.log(_nav);return;
      navData = _nav.data.categories;
      navData.unshift({
        _id: '',
        name: 'Home'
      });
});

render((
    <BrowserRouter basename='/'>
      <Blog>
         <Route exact path="/" component={Main}/>
         <Route path="/main" component={Main}/>
         <Route path="/view" component={View}/>
      </Blog>
    </BrowserRouter>
),rootElement);
