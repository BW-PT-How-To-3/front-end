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

function App() {
  const [cards, setCards] = useState([]);

  const addCard = card => {
    setCards([...cards, card]);
  }


return (
  <Router>
    <div className="App">
      <nav>
        {/* Linking login with token */}
        <Link to ='/login'>Login</Link>
        <Link to = '/'>Main Page</Link>
      </nav>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Signup}/>
      <Route path="/create-how-to"><NewCard addCard={addCard}/></Route>
      <Route path="/how-to-list"><HowToCards/></Route>
      <Route path="/my-how-tos"><UserHowToCards cards={cards}/></Route>
      <PrivateRoute exact path = '/'>
        <Homepage/>
      </PrivateRoute>
    </div>
  </Router>
);
}

export default App;
