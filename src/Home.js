import React from 'react';
import {Link} from "react-router-dom";
import './Home.css';

import sortingImage from './images/Sort.PNG';
import pathfindImage from './images/Path.PNG';



function Home() {
  return (
      <div>
    <div className="pathfindingroutes">

     <Link to ="/sorting">
  <button  className="routeButton" >Sorting Algorithms</button>
     </Link>

     <Link to ="/pathfinding">
  <button  className="routeButton" >Pathfinding Algorithms</button>
     </Link>

    </div>
    <div>
        <h1 className="Title">Welcome to my Algorithm Visualiser!</h1>
        <h2 className="SubTitle">I created this project to help A-Level computer science students who struggle to understand how sorting or pathfinding algorithms work</h2>
        <div className="row">

        <Link to ="/sorting">
            <div className="sort">
                <img className="image" alt = "Sorting Algorithm" src={sortingImage}></img>
            </div>
        </Link>


        <Link to ="/pathfinding">
            <div className="path">
                
                <img className="image" alt = "Pathfinding Algorithm" src={pathfindImage}></img>
            </div>
        </Link>
    
       
        </div>
       
    </div>
    </div>
    
  );
}

export default Home;