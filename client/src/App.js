import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import userLogin from './pages/userLogin';
import userHome from './pages/home';

export default class App extends React.Component{
  render(){
    return (
      <HashRouter>
        <div>
          <Route path='/' component={userLogin} exact />
          <Route path='/messages/home' component={userHome} exact />
        </div>
      </HashRouter>
    );
  }
}
