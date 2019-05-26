import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import userLogin from './userLogin';

export default class App extends React.Component{
  render(){
    return (
      <HashRouter>
        <div>
          <Route path='/user/auth' component={userLogin} exact />
        </div>
      </HashRouter>
    );
  }
}
