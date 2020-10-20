import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Login from './components/Users/login';
import Register from './components/Users/register';
import Works from './components/Works/works';
import OrdersList from './components/Orders/orders';
import CreateOrder from './components/OrderForm/createOrder';
import Order from './components/Orders/order';
import E404 from './components/E404';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Container fluid='sm' className='mb-5'>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/crearPedido" component={CreateOrder} />
            <Route path="/pedidos/:id" component={Order} />
            <Route path="/pedidos" component={OrdersList} />
            <Route path="/usuarios/registrar" component={Register} />
            <Route path="/trabajos" component={Works} />
            <Route component={E404} />
          </Switch>
        </Container>
      </Router>
    );
  }
}