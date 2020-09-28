import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const CardBtn = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  padding: 10px 12px;
  margin: 5px 2px;
  border: 1px solid #2b6bb0;
  color: white;
  background-color: #2b6bb0;
`;

function HowToCards({ card, setCards }) {
  const initialHowTo = {
    title: "",
    post: "",
    author: "",
    id: 0,
    created_at: "",
  };

  const [editing, setEditing] = useState(false);
  const [howToEdit, setHowToEdit] = useState(initialHowTo);
  const [newCard, setNewCard] = useState(initialHowTo);

  const addSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`api/howto/new`, newCard)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err))
      .finally(setNewCard(initialHowTo));
  };

  const editCard = (cards) => {
    setEditing(true);
    setHowToEdit(cards);
  };

  const saveEdit = (card) => {
    // setHowToEdit({
    //   id: card.id,
    //   title: howToEdit.title,
    //   post: howToEdit.post,
    //   author: card.author,
    //   created_at: card.created_at,
    // });

    const editedCard = {
      id: card.id,
      title: howToEdit.title,
      post: howToEdit.post,
      author: card.author,
      created_at: card.created_at,
    };

    // e.preventDefault();
    console.log(howToEdit);
    console.log(card);
    axiosWithAuth()
      .put(`api/howto/update/${card.id}`, editedCard)
      .then((res) => {
        console.log(res);
        setEditing(false);
        setCards((previousCards) =>
          // previousCards.map((cardItem) => {
          //   if (cardItem.id === howToEdit.id) {
          //     return howToEdit;
          //   } else {
          //     return cardItem;
          //   }
          // })
          previousCards.map((cardItem) => {
            if (cardItem.id === editedCard.id) {
              return editedCard;
            } else {
              return cardItem;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteCard = (card) => {
    console.log(card);
    axiosWithAuth()
      .delete(`/api/howto/delete/${card.id}`)
      .then((res) => {
        setCards((previousCards) =>
          previousCards.filter((cardItem) => {
            return cardItem.id !== card.id;
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  document.body.style =
    "background-image: linear-gradient(120deg, #A1C4FD 0%, #C2E9FB 100%);";

  return (
    <div>
      <div className="cards">
        <h2>{card.title}</h2>
        <p>{card.post}</p>

        {/* <span className = 'delete' onClick = {e => {
          e.stopPropagation();
          deleteCard(cards)          
        }
      }> */}

        {editing && (
          <form onSubmit={saveEdit}>
            <legend>Edit Card</legend>
            <label>
              title:
              <input
                onChange={(e) =>
                  setHowToEdit({
                    ...howToEdit,
                    title: e.target.value,
                  })
                }
                value={howToEdit.title}
              />
            </label>
            <label>
              post:
              <input
                onChange={(e) =>
                  setHowToEdit({
                    ...howToEdit,
                    post: e.target.value,
                  })
                }
                value={howToEdit.post}
              />
            </label>

            <div className="button-row"></div>
          </form>
        )}

        <CardBtn>
          <Button onClick={() => deleteCard(card)}>
            <FaTrash />
          </Button>
          <Button onClick={() => setEditing(true)}>
            <FaPencilAlt />
          </Button>
          <Button onClick={() => saveEdit(card)}>Save</Button>
        </CardBtn>
      </div>
    </div>
  );
}

export default HowToCards;
