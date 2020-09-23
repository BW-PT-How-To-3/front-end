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
      textDecoration: "none",
      color: "#4FD1C5",
      cursor: "pointer",
    },
  };

  const Navbar = styled.nav`
    display: flex;
    justify-content: space-around;
`;

  const NavItems = styled.div `
    font-size: 1.5rem;
    color: palevioletred;
    text-decoration: none;
  `;

return (
  <Router>
    <div className="App">

      <Navbar>
        {/* Linking login with token */}
        <NavItems>
          <Link to = '/'><span styles={styles.links}>Main Page</span></Link>
          <Link to = '/create-how-to'>Create New HowTo</Link>
          <Link to = '/my-how-tos'>My HowTo List</Link>
        </NavItems>
        <div>
          <Link to ='/login'>Login</Link>
        </div>
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
