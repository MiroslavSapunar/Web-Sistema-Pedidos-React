import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

import { ProtectedRoute } from "./utils/protected.route";
import Login from './components/Users/login';
import Register from './components/Users/register';
import Works from './components/Users/Works/works';
import OrdersList from './components/Users/Orders/orders';
import CreateOrder from './components/Customers/OrderForm/createOrder';
import Order from './components/Users/Orders/order';
import E403 from './components/Commons/E403';
import E404 from './components/Commons/E404';
import Profile from './components/Users/profile';
import Home from './components/Commons/Home';

const history = createBrowserHistory();

export default class Root extends Component {
  

  render() {
    return (
      <Router fluid={true} history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/registrar" component={Register} />
          <Route path="/pedidos/:id" component={Order} />
          <Route path="/403" component={E403} />
          <ProtectedRoute path="/perfil" component={Profile} />
          <ProtectedRoute path="/crearPedido" component={CreateOrder} />
          <ProtectedRoute path="/pedidos" component={OrdersList} />
          <ProtectedRoute path="/trabajos" component={Works} />
          <Route component={E404} />
        </Switch>
      </Router>
    );
  }
}
