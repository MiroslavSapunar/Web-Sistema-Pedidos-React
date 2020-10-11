import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from'./components/login';
import Menu from './components/menu';
import E404 from './components/E404';
import Exercises from './components/exercises';
import Navbar from './components/NavBar';
import CreateExercise from './components/createExercise';
import CreateUser from './components/createUser';
import CreateOrder from './components/createOrder';
import EditExercise from './components/editExercise';
import Bottom from './components/BottomBar';
import { Container } from 'react-bootstrap';

export default class Routes extends Component {
  render(){
    return (
      <Router>
        <Navbar />
        <Container fluid='md' className="min-vw-100">
            <Switch>
              <Route exact path="/" component= {Login}/>
              <Route path="/menu" component= {Menu}/>
              <Route path="/exercises" component= {Exercises}/>
              <Route path="/createexercise" component= {CreateExercise}/>
              <Route path="/edit/:id" component= {EditExercise}/>
              <Route path="/createuser" component= {CreateUser}/>
              <Route path="/crearpedido" component= {CreateOrder}/>
              <Route component= {E404}/>
            </Switch>
        </Container>
        <Bottom /> 
      </Router>
    );
  }
}