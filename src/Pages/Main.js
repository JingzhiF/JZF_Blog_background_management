import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Login from './Login';
import AdminIndex from './AdminIndex';

const Main = () => {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
      <Route path="/index/" exact component={AdminIndex} />
    </Router>
  );
};

export default Main;
