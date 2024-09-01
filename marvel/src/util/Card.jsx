import React, { useState, useEffect } from "react";
import "../css/card.css";
import "../css/index.css";

function Card(props) {
  return (
    <>
      <div id="card">
        {props.cards.map((image, index) => (
          <img key={index} src={image} />
        ))}
      </div>
    </>
  );
}

export default Card;
