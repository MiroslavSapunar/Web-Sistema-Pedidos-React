import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/**
 * 
 import CreateExercise from './components/createExercise';
 import Exercises from './components/exercises';
 import EditExercise from './components/editExercise';
 import CreateUser from './components/createUser';
              <Route path="/exercises" component= {Exercises}/>
              <Route path="/createexercise" component= {CreateExercise}/>
              <Route path="/edit/:id" component= {EditExercise}/>
              <Route path="/createuser" component= {CreateUser}/>

 */
 
import Login from'./components/login';
import Menu from './components/menu';
import E404 from './components/E404';
import Works from './components/works';
import Navbar from './components/NavBar';
import CreateOrder from './components/createOrder';
import ConfirmOrder from './components/confirmOrder';
import Orders from './components/orders';

export default class Routes extends Component {
  render(){
    return (
      <Router>
        <Navbar />
        <Container fluid='md' className="min-vw-100">
            <Switch>
              <Route exact path="/" component= {Login}/>
              <Route path="/menu" component= {Menu}/>
              <Route path="/crearPedido" component= {CreateOrder}/>
              <Route path="/confirmarpedido/:id" component= {ConfirmOrder}/>
              <Route path="/pedidos" component= {Orders}/>
              <Route path="/trabajos" component= {Works}/>
              <Route component= {E404}/>
            </Switch>
        </Container>
      </Router>
    );
  }
}