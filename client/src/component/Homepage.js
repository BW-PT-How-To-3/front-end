import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HowToCards from './HowToCards';


function Homepage(props) {
    //

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

