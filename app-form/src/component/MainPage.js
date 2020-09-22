import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";

////-------------------------Login User Gets to this page------------------------///
////-------------------------Access to all the cards-----------------------------///
////-------------------------React 2: imports Edit & delete functions into buttons on Card-----------------------------///

const MainPage = () => {
  const [user, setUser] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get(`api/users`)
      .then((res) => {
        setUser(res.data);
        setUser(res.data.card);
      })
      .catch((err) => console.log(err));
  }, []);

  //   DELETES CARD
  const history = useHistory();

  function deleteCard(id) {
    console.log(id);
    axiosWithAuth()
      .delete(`/api/cards/${id}`)
      .then((res) => {
        console.log(res);
        setRecipes(recipes.filter((card) => card.id !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
    //     CARDS linked here.
    //    form setup for Card layout
    <CardContainer>
      <CardStyling key={cards.id}>
        <div>
          {/* // Button properties get passed in as props */}
          <button onClick={() => deleteCard(cards.id)}>Delete</button>
          <button onClick={() => history.push(`/updateCard/${cards.id}`)}>
            Edit
          </button>
          {/* // alternate code
          // <CardList cards={cardList} updateCards={setCardList} />
          // <Bubbles cards={cardList} /> */}
        </div>
      </CardStyling>
    </CardContainer>
  );
};

export default MainPage;
