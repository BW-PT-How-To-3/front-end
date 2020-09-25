import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialHowTo = {
  title: '',
  post: '',
  author: '',
  id: 0,
  created_at: ''
}
const CardBtn = styled.div`
display: flex;
justify-content: space-around;
`;

const Button = styled.button`
padding: 10px 12px;
margin: 5px 2px;
`;

const HowToCards = ({}) => {
  // console.log(cards);
  const [editing, setEditing] = useState(false);
  const [howToEdit, setHowToEdit] = useState(initialHowTo);
  const [newCard, setNewCard] = useState(initialHowTo);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/howto/getall")
      .then((res) => {
        setCards(res.data);
      });
  }, []);

  // useEffect(() => {}, [cards]);
  const editCard = cards => {
    setEditing(true);
    setHowToEdit(cards);
  }

  const addSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post(`api/howto/new`, newCard)
    .then((res) => {
      setCards(res.data);
    })
    .catch((err) => console.log(err))
    .finally(setNewCard(initialHowTo));
  }

  const saveEdit = card => {
    setHowToEdit({
      id: card.id,
      title: howToEdit.title ,
      post: howToEdit.post ,
      author: card.author,
      created_at: card.created_at
    })

    // e.preventDefault();
    console.log(howToEdit);
    console.log(card);
    axiosWithAuth()
    .put(`api/howto/update/${card.id}`, howToEdit)
    .then((res) => {
      console.log(res);
      setEditing(false);
      setCards(
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

  const deleteCard = card => {
    console.log(card)
    axiosWithAuth()
    .delete(`api/howto/delete/${card.id}`)
    .then((res) => {
      setCards(
        cards.filter((cardItem) => {
          return cardItem.id !== card.id;
        })
      )
    })
    .catch((err) => {
      console.log(err.message);
    });
  };






 
  return (
    <div>
    {cards.map((cardItem) => (
      
    <div className="cards">
      <h2>{cardItem.title}</h2>
      <p>{cardItem.post}</p>
      
      <span className = 'delete' onClick = {e => {
          e.stopPropagation();
          deleteCard(cards)
          
        }
      }>
        
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
            
          </div>
          </form>
      )}
      <CardBtn>
      {/* <div> */}
        <Button onClick = {() => deleteCard(cardItem)}>Delete</Button>
        <Button onClick = {() => setEditing(true)}>Edit</Button>
        <Button onClick = {() => saveEdit(cardItem)}>Save</Button>
      </CardBtn>
      {/* </div> */}
          </div>
    ))
       
        }
  </div>
  )
}

export default HowToCards;
