import React from 'react';
import UserHowToCards from './UserHowToCards';

/*
BuergerForm => NewCard
HomePage => Homepage
OrderCard.js => HowToCards

UserHowToCards => this will house HowTocards
*/
function HowToCards({card}) {
    return (
        <div className="cards">
            {/* <button>Delete</button> */}
            <h2>{card.title}</h2>
            <p>{card.instructions}</p>
        </div>
    )
};

export default HowToCards;