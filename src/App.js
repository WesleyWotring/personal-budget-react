import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';


function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className = "mainContainer">
        <Switch>
          <Route path = "/about">
            <AboutPage/>
          </Route>

          <Route path = "/login">
            <LoginPage/>
          </Route>

          <Route path = "/">
            <HomePage/>
          </Route>

        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
