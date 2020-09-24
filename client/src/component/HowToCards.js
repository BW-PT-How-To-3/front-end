import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialHowTo = {
  title: '',
  post: '',
  author: ''
}

const HowToCards = ({ cards, updateCards }) => {
  console.log(cards);
  const [editing, setEditing] = useState(false);
  const [howToEdit, setHowToEdit] = useState(initialHowTo);
  const [newCard, setNewCard] = useState(initialHowTo);

  useEffect(() => {}, [cards]);
  const editCard = cards => {
    setEditing(true);
    setHowToEdit(cards);
  }

  const addSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post(`api/howto/`, newCard)
    .then((res) => {
      updateCards(res.data);
    })
    .catch((err) => console.log(err))
    .finally(setNewCard(initialHowTo));
  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`api/howto/update/${howToEdit.id}`, howToEdit)
    .then((res) => {
      setEditing(false);
      updateCards(
        cards.map((cardItem) => {
          if (cardItem.id === howToEdit.id){
            return howToEdit;
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

  const deleteCard = cards => {
    axiosWithAuth()
    .delete(`api/howto/${cards.id}`)
    .then((res) => {
      updateCards(
        cards.filter((cardItem) => {
          return cardItem.id !== cards.id;
        })
      )
    })
    .catch((err) => {
      console.log(err.message);
    });
  };






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
      <h2>{cards.title}</h2>
      <p>{cards.post}</p>
      <span className = 'delete' onClick = {e => {
          e.stopPropagation();
          deleteCard(cards)
        }
      }>
        x
      </span>{" "}
      {editing && (
        <form onSubmit = {saveEdit}>
          <legend>Edit Card</legend>
          <label>
            title:
            <input onChange = {e => 
            setHowToEdit({
              ...howToEdit,
               title: e.target.value})
            }
            value = {howToEdit.title}
            />
          </label>
          <label>
            post:
            <input onChange = {e => 
            setHowToEdit({
              ...howToEdit,
              post: e.target.value}
            )
          }
          value = {howToEdit.post}
          />
          </label>
          <div className = 'button-row'>
            
      <CardBtn>
        <Button>Delete</Button>
        <Button>Edit</Button>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </CardBtn>
          </div>

        </form>
      )}

    </div>
  );
}

export default HowToCards;
