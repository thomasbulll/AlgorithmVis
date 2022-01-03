import React from 'react';
import SortingVisualiser from './sortingVisualiser/sortingVisualiser';
import Home from './Home';
import pathfindingVisualiser from './pathfindingVisualiser/pathfindingVisualiser';
import {BrowserRouter as Router, Switch, Route}
from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>

        <Route path="/sorting">
        <SortingVisualiser></SortingVisualiser>
        </Route>

        <Route path="/pathfinding" component ={pathfindingVisualiser}>
        
        </Route>

        <Route path="/">
        <Home></Home>
        </Route>

      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
