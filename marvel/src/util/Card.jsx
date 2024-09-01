import React, { useState, useEffect } from "react";
import "../css/card.css";
import "../css/index.css";
import { marvel } from "./data.js";

function Card() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const x = marvel.map((char) => char.image);
    setCards(x);
  }, []);

  return (
    <>
      <div id="card">
      {cards.map((image, index) => (<img key={index} src={image} />))}
      </div>
    </>
  );
}

export default Card;
