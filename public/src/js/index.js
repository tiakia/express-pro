import React,{ Component } from 'react';
import {render} from 'react-dom';
import './../css/reset.scss';
import './../css/main.scss';
import Blog from './component/Blog';

let rootElement = document.getElementById('root');

const element = (
    <div>
      <Blog/>
    </div>
);

render(
     element,
     rootElement
);
