import { useState, useEffect } from "react";
import "../css/index.css";
import "../css/card.css";

function Remote(props) {

    
    return (
    <div id="remoteControl">
      <button type="button" id="filterButton_C" onClick={props.ButtonC}>
        <h1>Chronilogical</h1>
      </button>
      <button type="button" id="filterButton_R" onClick={props.ButtonR}>
        <h1>Release Date</h1>
      </button>

      <img src="" alt="" />
    </div>
  );
}

export default Remote;
