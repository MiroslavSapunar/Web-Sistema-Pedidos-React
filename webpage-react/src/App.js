import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './components/About'
import Nav from './components/Nav'
import Home from './components/Home'
import Monitor from './components/Monitor'
import Workshop from './components/Workshop'
import Login from './components/Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div class="App">
      <Nav/>
      <Switch>
        <Route path="/" exact component = {Home}/>
        <Route path="/about" component = {About}/>
        <Route path="/monitor" component = {Monitor}/>
        <Route path="/workshop" component = {Workshop}/>
        <Route path="/login" component = {Login}/>
      </Switch>
    </div>
    </Router>


  );
}

export default App;
