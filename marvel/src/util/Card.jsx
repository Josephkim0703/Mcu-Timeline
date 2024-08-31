import React, { useState, useEffect } from "react";
import "../css/card.css";
import { marvel } from "./data.js";
function Card() {
  const [card, setCard] = useState("");

  useEffect(() => {
    const allImages = marvel.map((character) => character.image);
    setCard(allImages);
  }, []);

  return (
    <>
      <div id="card">
      {card.map((image, index) => (
                    <img key={index} src={image} />
                ))}
      </div>
    </>
  );
}

export default Card;
