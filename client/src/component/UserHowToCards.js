import React from 'react';
import HowToCards from './HowToCards';
import { Link } from 'react-router-dom';
import Search from './Search';

const UserHowToCards = (props) => {
    document.body.style = 'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);';
    return (
        <div>
            <Search/>
            <Link to="/create-how-to"><button className="signup-btn">Add a new HowTo</button></Link>
            <div className="cards-main">
                {/* <h1>{props.order}</h1>
                <p>{props.instructions}</p>  */}
                {/* <Link to="create-how-to"><button>Add a new HowTo</button></Link> */}
                {props.cards.map((card, index) => 
                    <div>
                        <HowToCards
                            key={index} 
                            card={card} 
                        />
                    </div>
                )}
           </div>
        </div>
    );
}


export default UserHowToCards;