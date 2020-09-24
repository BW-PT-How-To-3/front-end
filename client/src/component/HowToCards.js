import React from "react";
import styled from "styled-components";

function HowToCards({ card }) {
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
      <p>{card.post}</p>
      <CardBtn>
        <Button>Delete</Button>
        <Button>Edit</Button>
      </CardBtn>
    </div>
  );
}

export default HowToCards;
