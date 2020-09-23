import React from 'react';
import HowToCards from './HowToCards';

const UserHowToCards = (props) => {

    return (
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
    );
}


export default UserHowToCards;