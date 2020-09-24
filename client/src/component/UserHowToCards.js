import React, { useEffect, useState } from "react";
import HowToCards from "./HowToCards";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const UserHowToCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/howto/getall")
      .then((res) => {
        setCards(res.data);
      });
  }, []);

  return (
    <div className="cards-main">
      {cards.map((card, index) => (
        <div>
          <HowToCards key={index} card={cards} />
        </div>
      ))}
    </div>
  );
};

export default UserHowToCards;
