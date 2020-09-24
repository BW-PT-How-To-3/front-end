import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function HowToCards({card}) {

    const CardBtn = styled.div`
        display: flex;
        justify-content: space-around;
    `;

    const Button = styled.button`
        padding: 10px 12px;
        margin: 5px 2px;
    `;

    return (
        <div className="cards">
            <h2>{card.title}</h2>
            <p>{card.instructions}</p>

            {/* These are the delete and edit buttons */}
            <CardBtn>
                {/* delete button */}
                <Button>
                    <FaTrash/>
                </Button>

                {/* edit button*/}
                <Button>
                    <FaPencilAlt/>
                </Button>
            </CardBtn>
        </div>
    )
};

export default HowToCards;