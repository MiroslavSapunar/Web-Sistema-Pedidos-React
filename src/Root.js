import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Users/login';
import Register from './components/Users/register';
import Works from './components/Works/works';
import OrdersList from './components/Orders/orders';
import CreateOrder from './components/OrderForm/createOrder';
import Order from './components/Orders/order';
import E404 from './components/E404';
import Profile from './components/Users/profile';
import NavBar from './components/NavBar';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Container fluid={true} className='mt-4 mb-3'>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/crearPedido" component={CreateOrder} />
            <Route path="/pedidos/:id" component={Order} />
            <Route path="/pedidos" component={OrdersList} />
            <Route path="/perfil" component={Profile} />
            <Route path="/usuarios/registrar" component={Register} />
            <Route path="/trabajos" component={Works} />
            <Route component={E404} />
          </Switch>
        </Container>
      </Router>
    );
  }
}