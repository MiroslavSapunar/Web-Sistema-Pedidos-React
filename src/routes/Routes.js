import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from'../pages/Login';
import Menu from '../pages/Menu';
import E404 from '../pages/E404';



class Routes extends Component {
  render(){
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {Login}/>
        <Route path="/menu" component= {Menu}/>
        <Route component= {E404}/>
      </Switch>
    </BrowserRouter>
  );
  }
}

export default Routes;
