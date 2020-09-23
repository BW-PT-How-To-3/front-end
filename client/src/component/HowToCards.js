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
        <div>
            <div>
                
                {/* Map over info from newcard comp to display here */}
                <h2>{card.title}</h2>
                <p>{card.instructions}</p>
            </div>
        </div>
    )
};

export default HowToCards;