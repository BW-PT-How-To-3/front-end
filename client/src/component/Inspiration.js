import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    border-radius: 50%;
    box-shadow: 0px 5px 20px gray;
    margin: 10% 2%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    width: 130px;
    height: 130px;
`;

const Image = styled.img`
    border-radius: 50%;
    width: 110px;
`;


function Inspiration(props){
    return (
        <CardContainer>
            <div>
                <h5>{props.title}</h5>
                <Image src={props.image} alt={props.title}/>
                <h5 className="calories">{props.calories} Calories</h5>
            </div>
        </CardContainer>
    )
};

export default Inspiration;