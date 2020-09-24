import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import Homepage from './component/Homepage';
import NewCard from './component/NewCard';
import HowToCards from './component/HowToCards';
import UserHowToCards from './component/UserHowToCards';
import './component/fontawesome';
import PrivateRoute from './utils/PrivateRoute';
import styled from 'styled-components';

function App() {
  const [cards, setCards] = useState([]);

  const addCard = card => {
    setCards([...cards, card]);
  }

  const styles = {
    links: {
      margin: "0 20px",
      cursor: "pointer",
      textDecoration: 'none',
      color: '#000',
      fontSize: '0.9rem'
    }
  };

  const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
`;

  const NavItems = styled.div `
    font-size: 1rem;
    color: palevioletred;
    text-decoration: none
  `;


return (
  <Router>
    <div className="App">

      <Navbar>
        {/* Linking login with token */}
        <div className="logo-div">
          <a href="https://lambda-how-to-build-week.netlify.app/index.html">
            <h3 className="logo">How<span>To</span></h3>
          </a>
        </div>
        
        <NavItems>
          <Link to = '/' style={styles.links}>Main Page</Link>
          <Link to = '/create-how-to' style={styles.links}>New HowTo</Link>
          <Link to = '/my-how-tos' style={styles.links}>My HowTos</Link>
          <Link to ='/login' style={styles.links}>Login</Link>
        </NavItems>
      </Navbar>

      <Route path = "/login" component={Login} />
      <Route path = "/register" component={Signup}/>
      <Route path = "/create-how-to"><NewCard addCard={addCard}/></Route>
      <Route path = "/how-to-list"><HowToCards/></Route>
      <Route path = "/my-how-tos"><UserHowToCards cards={cards}/></Route>
      <PrivateRoute exact path = '/'>
        <Homepage/>
      </PrivateRoute>

    </div>
  </Router>
);
}

export default App;
