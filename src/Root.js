import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from'./components/login/login';
import Menu from './components/menu/menu';
import E404 from './components/404/E404';
import Exercises from './components/exercises/exercises';
import Navbar from './components/navbar/navbar';
import CreateExercise from './components/createexercise/createExercise';
import CreateUser from './components/create-user/createUser';
import EditExercise from './components/editexercises/editExercise';
import Bottom from './components/buttom/bottom';

export default class Routes extends Component {
  render(){
    return (
      <Router>
        <Navbar />
        <div className="container">
        <Switch>
          <Route exact path="/" component= {Login}/>
          <Route path="/menu" component= {Menu}/>
          <Route path="/exercises" component= {Exercises}/>
          <Route path="/createexercise" component= {CreateExercise}/>
          <Route path="/edit" component= {EditExercise}/>
          <Route path="/createuser" component= {CreateUser}/>
          <Route component= {E404}/>
        </Switch>
        </div>
        <Bottom />
      </Router>
    );
  }
}