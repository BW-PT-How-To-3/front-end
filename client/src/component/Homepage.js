import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HowToCards from './HowToCards';


function Homepage(props) {
    //
    document.body.style = 'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);';

    //background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    
    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <h4>What would you like to do today?</h4>
            <Link to="/create-how-to"><button className="home-btn">Create a new How-To</button></Link>
            <Link to="/my-how-tos"><button className="home-btn">View my How-Tos</button></Link>
            {/* <Link to="/new-card"><button className="home-btn">Find Inspiration</button></Link> */}
        </div>
    )
}

export default Homepage;

