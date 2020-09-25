import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function HowToCards({card}) {
    document.body.style = 'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);';
    const CardBtn = styled.div`
        display: flex;
        justify-content: space-around;
    `;

    const Button = styled.button`
        padding: 10px 12px;
        margin: 5px 2px;
        border: 1px solid #2B6BB0;
        color: white;
        background-color: #2B6BB0;
    `;

    return (
        <div>

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
        </div>
    )
};

export default HowToCards;