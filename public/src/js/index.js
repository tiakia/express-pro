import React,{ Component } from 'react';
import { Route, Link, BrowserRouter,Redirect } from 'react-router-dom';
import {render} from 'react-dom';
import './../css/reset.scss';
import './../css/main.scss';
import Blog,{ Header, Nav } from './component/Blog';
import Views from './component/View';
import Main from './component/Main';

let rootElement = document.getElementById('root');

render((
    <BrowserRouter>
         <Blog/>
    </BrowserRouter>
),rootElement);
