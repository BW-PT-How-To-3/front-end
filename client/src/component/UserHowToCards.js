import React from 'react';
import HowToCards from './HowToCards';

const UserHowToCards = (props) => {

    return (
        <div>
           <h1>{props.order}</h1>
           <p>{props.instructions}</p> 
           {props.cards.map((card, i) => 
           <div>Existing
           <HowToCards
                key={i} 
                card={card} 
           /></div>
           )}
        </div>
    );
}


export default UserHowToCards;