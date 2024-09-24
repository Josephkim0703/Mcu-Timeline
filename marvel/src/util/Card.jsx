import React, { useState, useEffect } from "react";
import "../css/card.css";
import "../css/index.css";

function Card(props) {

  return (
    <>
      <div id="card">
        {props.cards.map((image, index) => (
          <div key={index}>
            <img src={image} />   
            {props.hide1 && (<h1>{props.date[index]}</h1>)}                  
            {props.hide2 && (<h1>{props.time[index]}</h1>)} 
            <h2 id="cards_name">{props.name[index]}</h2>  
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
