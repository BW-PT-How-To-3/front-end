import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Login from './component/Login';
// import your fontawesome library
import './component/fontawesome';
import PrivateRoute from './utils/PrivateRoute';

function App() {

return (
  <Router>
    <div className="App">
      <nav>
        {/* Linking login with token */}
        <Link to ='/'>Login</Link>
        <Link to = '/MainPage'>Main Page</Link>
      </nav>
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path = '/MainPage'>
        {/* <BubblePage/> */}
      </PrivateRoute>
    </div>
  </Router>
);
}

export default App;
